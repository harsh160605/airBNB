const User = require("../models/user")


module.exports.renderLogInForm = (req,res)=>{
    res.render("users/login.ejs");
}


module.exports.signUpForm = async(req,res)=>{
    try{
            let{username, email, password} = req.body;
    const newUser = new User({email,username});
    const registeredUser=  await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","User Registered Successfully");
        res.redirect(req.session.requestedUrl);
    })

    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}


module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.login = (req,res)=>{
    req.flash("success","Welecome Back You Are Logged In");
    let redirectUrl = req.session.requestedUrl || "/listings";
    res.redirect(redirectUrl);
}


module.exports.logout = (req,res,next )=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Your Are logged out now");
        res.redirect("/listings");

    })
    // next();

}