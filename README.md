🥕 AgriConnect: Community Food Resource & Waste Reduction Platform

🎯 Project Overview & Mission

AgriConnect is a full-stack web application designed to tackle food insecurity and reduce food waste by creating a direct, efficient link between local food surplus producers (Donors) and charitable food distribution organizations (Recipients).

We streamline the donation process, ensuring safe, nutritious food  reaches vulnerable communities and doesn't end up in landfills, directly contributing to Sustainable Development Goal (SDG) 2: Zero Hunger.

✨ Key Features

Real-Time Listing: Donors (farms, bakeries, restaurants) can quickly post available food items, specifying type, quantity, and expiry dates.

Role-Based Views: Dedicated dashboards for Donors (posting) and Recipients (claiming).

Seamless API: A robust Express.js API layer handles CRUD operations for listings and user data.

Modern Frontend: Built with React and styled using the high-performance Tailwind CSS v4 framework for a responsive, clean user experience.

MongoDB Integration: Flexible Mongoose schemas for structured data storage.

🛠️ Technology Stack

AgriConnect is built on the MERN stack, utilizing modern tools for development:

Backend (server)

|

| Technology | Role |
| Node.js / Express.js | Server runtime and RESTful API framework |
| MongoDB / Mongoose | Database and Object Data Modeling (ODM) |
| dotenv | Environment variable management |

Frontend (client)

| Technology | Role |
| React | Component-based UI library |
| Vite | Next-generation frontend tooling (fast bundling and development) |
| Axios | HTTP client for API requests |
| Tailwind CSS v4 | Utility-first styling framework |

🚀 Getting Started

Follow these steps to set up the project locally.

1. Prerequisites

Ensure you have the following installed:

Node.js (LTS version)

npm or yarn

MongoDB (running locally or a cloud instance like MongoDB Atlas)

2. Installation & Setup

Clone the repository:

# Replace with your actual repo URL if hosted
git clone [repository-url]
cd AgriConnect 



Install dependencies: The root package.json contains a convenient script to install dependencies for both the client and server:

npm run install-all 



Configure Environment Variables (.env) The server requires a .env file in the server/ directory. It is already populated with the specified MongoDB URI:

# Content of server/.env
PORT=5000
MONGO_URI=mongodb+srv://mern-stack:J.otiendedb97@cluster0.fycb2yi.mongodb.net/mernstack_express?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=super-secure-random-key-for-agriconnect-jwt
MAP_API_KEY=YOUR_MAP_API_KEY



3. Running the Application

Use the concurrent script from the root directory to start both the backend and frontend simultaneously:

npm run dev



| Component | Port | Description |
| Server (API) | http://localhost:5000 | Node/Express API, handles MongoDB connection. |
| Client (App) | http://localhost:5173 | React frontend application. |

The frontend will automatically proxy API requests to the backend (via vite.config.js).

📁 Project Structure

AgriConnect/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── App.jsx             # Main application component
│   │   └── index.css           # Tailwind v4 import
│   └── vite.config.js          # Proxy setup for API
│
├── server/                     # Node/Express Backend
│   ├── config/                 
│   │   └── db.js               # Database connection
│   ├── models/                 
│   │   └── FoodListing.js      # Mongoose Schema
│   ├── routes/                 
│   │   └── listingRoutes.js    # API Endpoints (/api/listings)
│   ├── controllers/            
│   │   └── listingController.js# Business Logic
│   └── server.js               # Main entry point
│
├── .env                        # Global environment variables
└── package.json                # Root utility scripts (e.g., npm run dev)



🛣️ Roadmap

Future development goals include:

$$$$

 Implement JWT Authentication for Donor and Recipient roles.

$$$$

 Integrate React Router for multi-page navigation.

$$$$

 Add a Geospatial Map View to visualize listings based on location.

$$$$

 Develop robust error handling and logging across the stack.

📜 License

Distributed under the MIT License. See the repository for more information.
