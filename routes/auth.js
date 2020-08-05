const express = require('express');
const { signup, signin, isSignedIn, signout } = require('../controllers/auth');
const router = express.Router();


//adding signup route
router.post("/signup", signup);

//adding signin route
router.post("/signin", signin);


//adding signout route
router.get("/signout", signout);

module.exports = router;