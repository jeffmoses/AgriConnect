import { MongoClient } from "npm:mongodb@6.3.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple token generation (use proper JWT in production)
function generateToken(payload: any): string {
  const tokenData = {
    ...payload,
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
  };
  return btoa(JSON.stringify(tokenData));
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
    const usersCollection = db.collection('users');
    const profilesCollection = db.collection('user_profiles');

    const url = new URL(req.url);
    const action = url.searchParams.get('action'); // 'login' or 'signup'

    const body = await req.json();
    const { email, password, name, role } = body;

    // SIGNUP
    if (action === 'signup') {
      // Check if user exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        await client.close();
        return new Response(JSON.stringify({ error: 'User already exists' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 409,
        });
      }

      // Create user (In production, hash the password!)
      const newUser = {
        email,
        password, // WARNING: Hash this in production!
        createdAt: new Date(),
      };

      const userResult = await usersCollection.insertOne(newUser);

      // Create profile
      const newProfile = {
        email,
        name,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await profilesCollection.insertOne(newProfile);

      // Generate token
      const token = generateToken({ 
        userId: userResult.insertedId.toString(), 
        email 
      });

      await client.close();

      return new Response(JSON.stringify({ 
        token,
        user: { email, name, role }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      });
    }

    // LOGIN
    if (action === 'login') {
      const user = await usersCollection.findOne({ email, password });
      
      if (!user) {
        await client.close();
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        });
      }

      const profile = await profilesCollection.findOne({ email });

      // Generate token
      const token = generateToken({ 
        userId: user._id.toString(), 
        email 
      });

      await client.close();

      return new Response(JSON.stringify({ 
        token,
        user: { 
          email, 
          name: profile?.name,
          role: profile?.role 
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await client.close();
    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
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
