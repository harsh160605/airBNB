const path = require("path");
// Load environment variables from parent folder's .env file if not in production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: path.join(__dirname, "../.env") });
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLAS_DB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"69ff34ea679b49e016e9420b"}))
    await Listing.insertMany(initData.data);
    console.log("Data Was initiliazed")
};

initDB();