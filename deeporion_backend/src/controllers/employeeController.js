const {getAllEmployees, filterEmployees, createEmployee, getEmployeeById, filterEmployeesByLocation, updateEmployee, deleteEmployee} = require("../services/EmployeeService");
const {updateEmployeeDepartment} = require("../services/employeeService");

exports.createEmployee = async (req, res) => {
    await createEmployee(req, res);
}

exports.getAllEmployees = async (req, res) => {
    await getAllEmployees(req, res);
}

exports.updateEmployee = async (req, res) => {
    await updateEmployee(req, res);
}

exports.deleteEmployee = async (req, res) => {
    await deleteEmployee(req, res);
}

exports.getEmployeeById = async (req, res) => {
    await getEmployeeById(req, res);
}

exports.filterEmployees = async (req, res) => {
    const { location, order } = req.query;

    try {
        const employees = await filterEmployees(location, order);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.filterEmployeesByName = async (req, res) => {
    await filterEmployeesByName(req, res);
}

exports.updateEmployeeDepartment = async (req, res) => {
    await updateEmployeeDepartment(req, res);
}