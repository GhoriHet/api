const express = require('express');
const passport = require('passport')
const { usersController } = require('../controller');
const { createAccessRefreshToken } = require('../controller/user.controller');

const router = express.Router();

router.get("/", () => {
    console.log("GET users API..");
});

router.post(
    "/register",
    // upload.array('photos', 12),
    usersController.register
);

router.post(
    "/login",
    usersController.login
);

router.post(
    "/send-otp",
    (req, res, next) => {
        res.status(200).json({
            message: "OTP sent your mobile number."
        })
    }
);

router.post(
    "/verifyOTP",
    // (req, res, next) => {
    //     res.status(200).json({
    //         message: "Verification successfully."
    //     })
    // }
);

router.post(
    "/generateNewToken",
    usersController.generateNewToken
)

router.get(
    '/logout',
    usersController.logout
)

router.get(
    "/google",
    passport.authenticate('google', { scope: ['profile'] })
)

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function (req, res) {
        const options = {
            httpOnly: true,
            secure: true
        }
        const { access_token } = await createAccessRefreshToken(req.user._id)
        res.cookie('access_token', access_token, options)

        console.log("Okay")
        res.redirect('http://localhost:3000/api/v1/category/list-category');
    });

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: 'http://localhost:3000/api/v1/category/list-category', failureRedirect: '/login' }),
    //   function(req, res) {
    //     // Successful authentication, redirect home.
    //     res.redirect('http://localhost:3000/api/v1/category/list-category');
    //   }
);

module.exports = router;