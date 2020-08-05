const express = require('express');
const { isSignedIn } = require('../controllers/auth');
const { uploadEmployee, deleteEmployee, updateEmployee } = require('../controllers/employee');
const router = express.Router();

router.post("/addemployee", isSignedIn, uploadEmployee );

router.post("/deleteemp", isSignedIn, deleteEmployee);

router.post("/updateemp", isSignedIn, updateEmployee);


module.exports = router;