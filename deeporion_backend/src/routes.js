const express = require('express');
const {auth, isManager} = require("./middlewares/auth");
const authController = require("./controllers/authController");
const departmentController = require("./controllers/departmentController");
const employeeController = require("./controllers/employeeController");
const router = express.Router();

//Test here
router.get('/hello-world', (req, res) => {
    res.send('Hello, world!');
});

//Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected manager routes
router.get('/departments', departmentController.findAllDepartments);
router.post('/departments', departmentController.createDepartment);
router.put('/departments/:id', departmentController.updateDepartment);
router.delete('/departments/:id', departmentController.deleteDepartment);

// Protected employee routes
router.get('/employee', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employee', employeeController.createEmployee);
router.put('/employee/:id', employeeController.updateEmployee);
router.delete('/employee/:id', employeeController.deleteEmployee);
router.get('/employee/filterEmployees', employeeController.filterEmployees);
router.get('/employee/filterEmployeesByName', employeeController.filterEmployeesByName);
router.put('/employee/:id/department', employeeController.updateEmployeeDepartment);

module.exports = router;
