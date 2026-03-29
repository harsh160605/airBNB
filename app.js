const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");
const { ppid } = require("process");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js")
const { listingSchema, reviewSchema } = require("./schema1.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Review = require("./models/review.js");

const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        app.listen(8080, () => {
            console.log("Server running on port 8080");
        });

    } catch (err) {
        console.log("DB connection error:", err);
    }
}

main();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsmate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Hi I am root");
});




app.use("/listings" ,listings);
app.use("/listings/:id/reviews" ,reviews);






app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
})
// app.listen(8080, () => {
//     console.log("Server running on port 8080");
// });
