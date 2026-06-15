# 🗺️ Wanderlust - Full-Stack Airbnb Clone

Wanderlust is a feature-rich, full-stack web application inspired by Airbnb. It allows users to list rental properties (listings), browse available properties around the world, upload images of their properties, view property details, and write reviews with rating systems.

Developed using the Model-View-Controller (MVC) architecture, the project utilizes Node.js, Express, MongoDB, EJS templating, and integrates Cloudinary for cloud-based image storage.

---

## 🚀 Features

- 👤 **User Authentication & Authorization**: 
  - Secure registration, login, and logout using Passport.js.
  - Route authorization ensuring only the owner of a listing can edit or delete it, and only authenticated users can write reviews or create listings.
- 🏡 **Listing Management (CRUD)**:
  - Users can view all listings, see detailed information for individual listings, add new listings with images, and update or delete their listings.
- 💬 **Review System**:
  - Authenticated users can leave reviews (1-5 star ratings and comments) on listings.
  - Review creators can delete their own reviews.
- ☁️ **Image Hosting**:
  - Seamless image uploads integrated with Cloudinary via Multer.
- 🎨 **Responsive UI**:
  - Built with EJS-Mate layouts and styled with Bootstrap for a modern, responsive user experience on mobile and desktop devices.
  - Micro-animations for interactive ratings.

---

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using [Mongoose ODM](https://mongoosejs.com/))
- **Frontend**: EJS (Embedded JavaScript), [EJS-mate](https://www.npmjs.com/package/ejs-mate), [Bootstrap 5](https://getbootstrap.com/), Vanilla CSS
- **Authentication**: [Passport.js](http://www.passportjs.org/) (Local Strategy)
- **File Uploads**: [Multer](https://github.com/expressjs/multer) & [Cloudinary](https://cloudinary.com/)
- **Session/Storage**: `express-session`, `connect-mongo`, `connect-flash`

---

## ⚙️ Project Structure

```text
airbnb/
├── controllers/          # Business logic (MVC Controllers)
│   ├── listing.js        # Listings operations
│   ├── review.js         # Reviews operations
│   └── user.js           # Authentication operations
├── init/                 # Sample data & Database initialization script
│   ├── data.js           # Sample listings data
│   └── index.js          # DB seeding script
├── models/               # MongoDB models (Schemas)
│   ├── listing.js        # Listing Schema
│   ├── review.js         # Review Schema
│   └── user.js           # User Schema
├── public/               # Static assets
│   ├── css/              # Custom stylesheets
│   └── js/               # Client-side scripts
├── routes/               # Express routers (Routing layer)
│   ├── listing.js        # Listings routes
│   ├── review.js         # Reviews routes
│   └── user.js           # Authentication routes
├── utils/                # Helper functions / middleware
│   ├── ExpressError.js   # Custom error class
│   └── wrapAsync.js      # Async wrapper for route handlers
├── views/                # Views (EJS templates)
│   ├── layouts/          # EJS Layouts (Boilerplates)
│   ├── listings/         # Listing views (Index, Show, Edit, New)
│   └── users/            # Authentication views (Signup, Login)
├── .env                  # Environment variables (Git-ignored)
├── app.js                # App entry point
├── cloudConfig.js        # Cloudinary integration setup
├── middlewear.js         # Custom middleware (isLoggedIn, isOwner, etc.)
├── package.json          # Project configuration and dependencies
└── schema1.js            # Joi schema validation rules
```

---

## 🔧 Installation and Setup

Follow these steps to set up and run the project locally on your machine.

### Prerequisites
- Node.js (version 20.x recommended)
- MongoDB installed locally or a MongoDB Atlas account
- A Cloudinary account for managing image uploads

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd airbnb/airbnb
```

### Step 2: Install Dependencies
Install all required Node.js packages:
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a file named `.env` in the `airbnb` root folder and populate it with the following configuration:
```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECERECT=your_cloudinary_api_secret
ATLAS_DB_URL=your_mongodb_connection_uri
SECRET=your_express_session_secret
```
> **Note:** Ensure your `.env` file is included in your `.gitignore` to protect sensitive keys.

### Step 4: Seed the Database
Initialize the database with sample data:
```bash
node init/index.js
```

### Step 5: Start the Server
Launch the application:
```bash
npm start
```
The server will start on port `8080`. Open your browser and navigate to `http://localhost:8080/listings` to explore the app!

---

## 🔒 License
This project is licensed under the ISC License.
