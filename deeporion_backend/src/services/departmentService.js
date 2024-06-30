const Department = require('../models/departmentModel');
const Employee = require("../models/employeeModel");

exports.createDepartment = async (req, res)=> {
    const { name } = req.body;

    try {
        const department = new Department({ name });
        res.status(201).json(await department.save());
    } catch (error) {
        res.status(400).json({ message: 'Error creating department', error });
    }
}


exports.findAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departments', error });
    }
}

exports.updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const department = await Department.findByIdAndUpdate(id, { name }, { new: true });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.json(department);
    } catch (error) {
        res.status(400).json({ message: 'Error updating department', error });
    }
}

exports.deleteDepartment = async (req, res) => {
    const { id } = req.params;

    try {
        const department = await Department.findByIdAndDelete(id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting department', error });
    }
}