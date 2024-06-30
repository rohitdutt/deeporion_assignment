const {createDepartment, findAllDepartments, updateDepartment, deleteDepartment} = require("../services/departmentService");

exports.createDepartment = async (req, res) => {
    await createDepartment(req, res);
}

exports.findAllDepartments = async (req, res) => {
    await findAllDepartments(req, res);
}

exports.updateDepartment = async (req, res) => {
    await updateDepartment(req, res);
}

exports.deleteDepartment = async (req, res) => {
    await deleteDepartment(req, res);
}