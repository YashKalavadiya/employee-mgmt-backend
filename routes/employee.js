const express = require('express');
const { isSignedIn } = require('../controllers/auth');
const { uploadEmployee, deleteEmployee, updateEmployee, getAllemployee, getEmployeeById, getEmployee } = require('../controllers/employee');
const router = express.Router();

router.param("empId", getEmployeeById);

router.post("/addemployee", isSignedIn, uploadEmployee );

router.post("/deleteemp", isSignedIn, deleteEmployee);

router.post("/updateemp", isSignedIn, updateEmployee);

router.get("/getemployees", getAllemployee)

router.get("/get/:empId", getEmployee);

module.exports = router;