# AgriConnect MongoDB Atlas API Documentation

## Base URL
Your Edge Functions will be available at:
`https://jovbsxbfnpbyentiymyn.supabase.co/functions/v1/`

## Authentication

### POST /auth?action=signup
Create a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "donor" // or "recipient" or "volunteer"
}
```

**Response:**
```json
{
  "token": "encoded_token",
  "user": {
    "email": "user@example.com",
    "name": "John Doe",
    "role": "donor"
  }
}
```

### POST /auth?action=login
Login to existing account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "encoded_token",
  "user": {
    "email": "user@example.com",
    "name": "John Doe",
    "role": "donor"
  }
}
```

---

## Food Listings

### GET /food-listings
Get all food listings

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Fresh Tomatoes",
    "donor": "Green Valley Farm",
    "quantity": "5 kg",
    "expiry": "2025-12-25",
    "location": "Downtown",
    "status": "available",
    "userId": "user_id",
    "createdAt": "2025-10-23T...",
    "updatedAt": "2025-10-23T..."
  }
]
```

### GET /food-listings?id={listing_id}
Get single listing by ID

### POST /food-listings
Create new food listing

**Request Body:**
```json
{
  "title": "Fresh Tomatoes",
  "donor": "Green Valley Farm",
  "quantity": "5 kg",
  "expiry": "2025-12-25",
  "location": "Downtown",
  "status": "available",
  "userId": "user_id_here"
}
```

### PUT /food-listings?id={listing_id}
Update existing listing

**Request Body:**
```json
{
  "status": "claimed",
  "quantity": "3 kg"
}
```

### DELETE /food-listings?id={listing_id}
Delete a listing

---

## User Profiles

### GET /user-profiles
Get all user profiles

### GET /user-profiles?email={email}
Get profile by email

### GET /user-profiles?id={profile_id}
Get profile by ID

### POST /user-profiles
Create new profile

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "donor"
}
```

### PUT /user-profiles?id={profile_id}
Update profile

### DELETE /user-profiles?id={profile_id}
Delete profile

---

## MongoDB Collections

Your MongoDB database `mernstack_express` will have these collections:

1. **users** - Authentication data
   - email
   - password (hash in production!)
   - createdAt

2. **user_profiles** - User information
   - email
   - name
   - role (donor/recipient/volunteer)
   - createdAt
   - updatedAt

3. **food_listings** - Food donations
   - title
   - donor
   - quantity
   - expiry
   - location
   - status
   - userId
   - createdAt
   - updatedAt

## Security Notes

⚠️ **IMPORTANT**: The current auth implementation stores passwords in plain text. In production, you MUST:
1. Hash passwords using bcrypt or similar
2. Implement proper JWT with signing
3. Add input validation
4. Implement rate limiting
5. Add proper error handling

## Testing the APIs

You can test using curl:

```bash
# Signup
curl -X POST "https://jovbsxbfnpbyentiymyn.supabase.co/functions/v1/auth?action=signup" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test User","role":"donor"}'

# Get listings
curl "https://jovbsxbfnpbyentiymyn.supabase.co/functions/v1/food-listings"
```
