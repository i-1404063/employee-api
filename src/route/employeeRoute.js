const express = require('express')

const auth  = require('../middleware/auth')
const empService = require("../service/EmployeeService");

const router = express.Router();

router.post('/add', [auth], empService.createEmployee);
router.get("/emp-hierarchy/:id", [auth], empService.fetchEmployees)

module.exports = router;