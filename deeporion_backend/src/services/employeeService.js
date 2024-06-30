const Employee = require('../models/employeeModel');
const Department = require("../models/departmentModel");

exports.createEmployee = async (req, res, _id) => {
    try {
        const employee = new Employee({
            name: req.body.name,
            userId: _id,
            departmentId: '667cca9e06afe31f9a01d23b',
            isManager: req.body.isManager,
            email: req.body.email
        });
        const newEmployee = await employee.save();
        return newEmployee;
    } catch (error) {
        res.status(400).json({ message: 'Error creating employee', error: error.message });
    }
}

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate({
            path: 'department',
            select: 'name' // Only select the 'name' field from department
        });
        [employees].forEach(employee => {
            const department = Department.findById(employee.departmentId);
            employee.departmentName = department.name;
        });
        res.status(200).json(employees);

    } catch (error) {
        throw new Error('Error fetching employees with department name: ' + error.message);
    }
};

exports.getEmployeeById = async (req, res, id) => {
    try {
        const employee = await Employee.findById(id).populate('department');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee by ID', error: error.message });
    }
};

exports.updateEmployee = async (req, res, id, updatedData) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: 'Error updating employee', error: error.message });
    }
};

exports.deleteEmployee = async (req, res, id) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(deletedEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
};

exports.filterEmployees = async (location, order) => {
    try {
        let query = Employee.find();

        if (order === 'asc') {
            // Sort by name in ascending order, case-sensitive
            query = query.collation({ locale: 'en' }).sort({ name: 1 });
        } else if (order === 'desc') {
            // Sort by name in descending order, case-sensitive
            query = query.collation({ locale: 'en' }).sort({ name: -1 });
        }
        query = query.populate('departmentId', 'name'); // Only select the 'name' field from department

        const employees = await query.exec();

        // Map through employees to add 'departmentName'
        const employeesWithDepartmentNames = employees.map(employee => ({
            name: employee.name,
            location: employee.location,
            departmentName: employee.departmentId ? employee.departmentId.name : null
        }));
        return employeesWithDepartmentNames;
    } catch (error) {
        throw new Error('Error filtering employees: ' + error.message);
    }
};

