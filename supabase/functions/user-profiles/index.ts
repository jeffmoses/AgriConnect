import { MongoClient, ObjectId } from "npm:mongodb@6.3.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UserProfile {
  _id?: ObjectId;
  email: string;
  name: string;
  role: 'donor' | 'recipient' | 'volunteer';
  createdAt: Date;
  updatedAt: Date;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const mongoUri = Deno.env.get('MONGODB_URI');
    if (!mongoUri) {
      throw new Error('MongoDB URI not configured');
    }

    const client = new MongoClient(mongoUri);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('mernstack_express');
    const collection = db.collection<UserProfile>('user_profiles');

    const url = new URL(req.url);
    const method = req.method;

    // GET - Fetch profile by email or ID
    if (method === 'GET') {
      const id = url.searchParams.get('id');
      const email = url.searchParams.get('email');
      
      if (id) {
        const profile = await collection.findOne({ _id: new ObjectId(id) });
        await client.close();
        return new Response(JSON.stringify(profile), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (email) {
        const profile = await collection.findOne({ email });
        await client.close();
        return new Response(JSON.stringify(profile), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const profiles = await collection.find({}).toArray();
      await client.close();
      return new Response(JSON.stringify(profiles), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // POST - Create new profile
    if (method === 'POST') {
      const body = await req.json();
      
      // Check if profile already exists
      const existing = await collection.findOne({ email: body.email });
      if (existing) {
        await client.close();
        return new Response(JSON.stringify({ error: 'Profile already exists' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 409,
        });
      }

      const newProfile: UserProfile = {
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await collection.insertOne(newProfile);
      await client.close();

      return new Response(JSON.stringify({ 
        _id: result.insertedId,
        ...newProfile 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      });
    }

    // PUT - Update profile
    if (method === 'PUT') {
      const id = url.searchParams.get('id');
      if (!id) {
        await client.close();
        return new Response(JSON.stringify({ error: 'ID required' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      const body = await req.json();
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...body, updatedAt: new Date() } }
      );

      await client.close();
      return new Response(JSON.stringify({ 
        success: result.modifiedCount > 0,
        modifiedCount: result.modifiedCount 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // DELETE - Delete profile
    if (method === 'DELETE') {
      const id = url.searchParams.get('id');
      if (!id) {
        await client.close();
        return new Response(JSON.stringify({ error: 'ID required' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      await client.close();

      return new Response(JSON.stringify({ 
        success: result.deletedCount > 0,
        deletedCount: result.deletedCount 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await client.close();
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    });

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
