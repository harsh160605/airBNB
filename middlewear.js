const Listing = require("./models/listing");
const Review = require("./models/review");



module.exports.isLoggedIn = (req, res, next) => {
    console.log("isAuthenticated:", typeof req.isAuthenticated);

    if (!req.isAuthenticated()) {
        req.session.requestedUrl = req.orginalUrl;
        req.flash("error", "You Must Log In To Create Listings");
        return res.redirect("/login");
    }
    next();
};



module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.requestedUrl){
        res.locals.redirectUrl = req.session.requestedUrl;
    }
    next();
}


module.exports.isOwner = async (req,res,next) =>{
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};


module.exports.isReviewAuthor = async (req,res,next) =>{
    let {id, reviewId } = req.params;

    const listing = await Review.findById(reviewId);

    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are did not created this review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};