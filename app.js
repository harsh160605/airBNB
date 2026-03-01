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
const { listingSchema } = require("./schema1.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}
// INDEX
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));

// NEW
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// CREATE
app.post("/listings", validateListing, wrapAsync(async (req, res) => {

    const newListing = new Listing(req.body.listing);
    if (!req.body.listing.image || req.body.listing.image === "") {
        delete newListing.image;
    } else {
        newListing.image = { url: req.body.listing.image };
    }
    await newListing.save();
    res.redirect("/listings");
}));

// SHOW
app.get("/listings/:id", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    res.render("listings/show", { listing });
}));

// EDIT
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    res.render("listings/edit", { listing });
}));

// UPDATE
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listingData = { ...req.body.listing };

    if (typeof listingData.image === "string" && listingData.image !== "") {
        listingData.image = { url: listingData.image };
    } else {
        delete listingData.image;
    }

    await Listing.findByIdAndUpdate(id, listingData);
    res.redirect(`/listings/${id}`);
}));

// DELETE ✅ FIXED
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
}));




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
