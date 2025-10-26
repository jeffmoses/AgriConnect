import { MongoClient, ObjectId } from "npm:mongodb@6.3.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FoodListing {
  _id?: ObjectId;
  title: string;
  donor: string;
  quantity: string;
  expiry: string;
  location: string;
  status: string;
  userId: string;
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
    const collection = db.collection<FoodListing>('food_listings');

    const url = new URL(req.url);
    const method = req.method;

    // GET - Fetch all listings or by ID
    if (method === 'GET') {
      const id = url.searchParams.get('id');
      
      if (id) {
        const listing = await collection.findOne({ _id: new ObjectId(id) });
        await client.close();
        return new Response(JSON.stringify(listing), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const listings = await collection.find({}).sort({ createdAt: -1 }).toArray();
      await client.close();
      return new Response(JSON.stringify(listings), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // POST - Create new listing
    if (method === 'POST') {
      const body = await req.json();
      const newListing: FoodListing = {
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await collection.insertOne(newListing);
      await client.close();

      return new Response(JSON.stringify({ 
        _id: result.insertedId,
        ...newListing 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      });
    }

    // PUT - Update listing
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

    // DELETE - Delete listing
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
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
