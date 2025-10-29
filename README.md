# 🥕 AgriConnect: Community Food Resource & Waste Reduction Platform

## 🎯 Project Overview & Mission

AgriConnect is a full-stack web application designed to tackle food insecurity and reduce food waste by creating a direct, efficient link between local food surplus producers (Donors) and charitable food distribution organizations (Recipients).

We streamline the donation process, ensuring safe, nutritious food reaches vulnerable communities and doesn't end up in landfills, directly contributing to Sustainable Development Goal (SDG) 2: Zero Hunger.

Here is a webapp <a href="https://agrikonnect.lovable.app/">link</a>

## ✨ Key Features

- **Role-Based Authentication**: Secure signup and login system with three user roles (Donor, Recipient, Volunteer)
- **Donor Dashboard**: Donors can post, edit, and delete food listings
- **Recipient Dashboard**: Recipients can view available food listings
- **Real-Time Listing Management**: Post available food items with details like type, quantity, and expiry dates
- **Modern UI**: Built with React, Tailwind CSS, and shadcn/ui components for a clean, responsive experience
- **Cloud Functions**: Serverless backend powered by Lovable Cloud with MongoDB Atlas integration

## 🛠️ Technology Stack

### Frontend
| Technology | Role |
|------------|------|
| React 18 | Component-based UI library |
| TypeScript | Type-safe development |
| Vite | Next-generation frontend tooling |
| Tailwind CSS | Utility-first styling framework |
| shadcn/ui | Reusable component library |
| React Router | Client-side routing |
| React Query | Data fetching and caching |

### Backend
| Technology | Role |
|------------|------|
| Lovable Cloud | Serverless backend platform |
| Edge Functions | Serverless API endpoints (Deno runtime) |
| MongoDB Atlas | Cloud-hosted NoSQL database |

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn
- MongoDB Atlas account (connection string required)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd AgriConnect
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   The project uses Lovable Cloud with pre-configured environment variables. The MongoDB connection string is stored as a secret in the cloud environment.

4. **Run the application**:
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:8080`

## 📁 Project Structure

```
AgriConnect/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── NewListingDialog.tsx
│   │   └── EditListingDialog.tsx
│   ├── pages/              # Page components
│   │   ├── Landing.tsx     # Landing page
│   │   ├── Auth.tsx        # Login/Signup page
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   └── Index.tsx       # Route handler
│   ├── integrations/
│   │   └── supabase/       # Lovable Cloud client
│   └── lib/                # Utility functions
├── supabase/
│   └── functions/          # Edge Functions (serverless APIs)
│       ├── auth/           # Authentication endpoint
│       ├── food-listings/  # CRUD operations for listings
│       └── user-profiles/  # User profile management
└── public/                 # Static assets
```

## 🔌 API Endpoints

### Authentication (`/auth`)
- **POST** `?action=signup` - Create new user account
- **POST** `?action=login` - Login to existing account

### Food Listings (`/food-listings`)
- **GET** - Fetch all listings or by ID
- **POST** - Create new listing (Donor only)
- **PUT** `?id={id}` - Update listing (Donor only)
- **DELETE** `?id={id}` - Delete listing (Donor only)

### User Profiles (`/user-profiles`)
- **GET** - Fetch profiles by email or ID
- **POST** - Create new profile
- **PUT** `?id={id}` - Update profile
- **DELETE** `?id={id}` - Delete profile

For detailed API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## 🗄️ Database Schema

### MongoDB Collections

#### `users`
- email (string, unique)
- password (string) ⚠️ *Plain text in current implementation*
- createdAt (Date)

#### `user_profiles`
- email (string, unique)
- name (string)
- role (string: 'donor' | 'recipient' | 'volunteer')
- createdAt (Date)
- updatedAt (Date)

#### `food_listings`
- title (string)
- donor (string)
- quantity (string)
- expiry (string)
- location (string)
- status (string)
- userId (string)
- createdAt (Date)
- updatedAt (Date)

## 🔐 Authentication Flow

1. User signs up with email, password, name, and role
2. System creates entries in both `users` and `user_profiles` collections
3. Server generates a simple token (base64 encoded)
4. Token and user data stored in localStorage
5. Role-based UI rendering (donors see post/edit/delete options)

## 🎨 Design System

The application uses a semantic design system with:
- Custom color tokens defined in `src/index.css`
- Tailwind configuration in `tailwind.config.ts`
- shadcn/ui components for consistent UI elements
- Responsive design for mobile and desktop

## 🛣️ Roadmap

### Completed ✅
- JWT-based authentication with role support
- Role-based access control (Donor vs Recipient views)
- Full CRUD operations for food listings
- Responsive UI with modern design

### Future Development 🚀
- **Security Enhancements**: Implement bcrypt password hashing
- **Enhanced JWT**: Proper JWT signing and validation
- **Geospatial Features**: Map view to visualize food listings by location
- **Notifications**: Email/SMS alerts for new listings
- **Analytics Dashboard**: Track donation impact and statistics
- **Mobile App**: React Native version for iOS and Android
- **Admin Panel**: Manage users and monitor platform activity

## ⚠️ Security Notes

**IMPORTANT**: The current authentication implementation has the following limitations:

1. **Passwords are stored in plain text** - Must implement bcrypt hashing before production
2. **Simple token generation** - Should use proper JWT with signing
3. **No input validation** - Add comprehensive validation on all inputs
4. **No rate limiting** - Implement to prevent abuse
5. **Basic error handling** - Needs enhancement for production use

**Do not deploy this application to production without addressing these security concerns!**

## 📝 License

Distributed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Built with ❤️ to fight food waste and hunger**
