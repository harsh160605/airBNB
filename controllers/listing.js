const Listing = require("../models/listing");
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}


module.exports.renderNewForm = (req, res) => {

    res.render("listings/new");
}



module.exports.showListings = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    .populate({
        path: "reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if (!listing) {
        req.flash("Errr", "Listing Does Not Exist");
        // res.redirect("/listings");
        throw new ExpressError(404, "Listing not found");
        // res.redirect("/listings");
    }
    res.render("listings/show", { listing });
}


module.exports.createListings = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    if (!req.body.listing.image || req.body.listing.image === "") {
        delete newListing.image;
    } else {
        newListing.image = { url: req.body.listing.image };
    }
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}



module.exports.editListings = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit", { listing , originalImageUrl});
}



module.exports.updateListings = async (req, res) => {
    let { id } = req.params;

    let listingData = { ...req.body.listing };

    // If new image uploaded
    if (req.file) {
        listingData.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await Listing.findByIdAndUpdate(id, listingData);
//     console.log(listingData);
// console.log(req.file);

    res.redirect(`/listings/${id}`);
};



module.exports.deleteListings = async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}