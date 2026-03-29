const express = require("express");
const router = express.Router();
const app = express();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js")
const { listingSchema, reviewSchema } = require("../schema1.js");
const Listing = require("../models/listing.js");


// Validate Listing
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
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));

// NEW
router.get("/new", (req, res) => {
    res.render("listings/new");
});

// CREATE
router.post("/", validateListing, wrapAsync(async (req, res) => {

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
router.get("/:id", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate("reviews");
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    res.render("listings/show", { listing });
}));



// EDIT
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    res.render("listings/edit", { listing });
}));

// UPDATE
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
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
router.delete("/:id", wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
}));



module.exports = router;