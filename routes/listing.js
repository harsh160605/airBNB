const express = require("express");
const router = express.Router();
const app = express();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js")
const { listingSchema, reviewSchema } = require("../schema1.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner} = require("../middlewear.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

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


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        // validateListing,
        isLoggedIn,
        upload.single("listing[image]"),
        wrapAsync(listingController.createListings)
    );





// NEW
router.get("/new",
    isLoggedIn,
    listingController.renderNewForm
);


router
    .route("/:id")
    .get(
    wrapAsync(listingController.showListings)
    )
    .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListings)
    )
    .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListings)
    )








// EDIT
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListings)
);







module.exports = router;