const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync(async(req,res)=>{
    try{
            let{username, email, password} = req.body;
    const newUser = new User({email,username});
    const registeredUser=  await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success","User Registered Successfully");
    res.redirect("/listings");
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}));


router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",passport.authenticate("local", {failureRedirect:'/login.', failureFlash: true}),(req,res)=>{
    req.flash("success","Welecome Back You Are Logged In");
    res.redirect("/listings");
})

module.exports = router;