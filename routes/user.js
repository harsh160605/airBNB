const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewear.js")
const userController = require("../controllers/user.js")



router.route("/signup")
    .get(userController.renderSignUpForm)
    .post( wrapAsync(userController.signUpForm)
)

router.route("/login")
.get(userController.renderLogInForm)
.post( 
    saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:'/login.', failureFlash: true}),
    userController.login
)



router

router

router.get("/logout", userController.logout)
module.exports = router;