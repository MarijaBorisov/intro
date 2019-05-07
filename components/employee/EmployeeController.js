var express = require('express');
var logger = require('../../utils/logs/winston')
var Employee = require('../employee/Employee');

addEmployee = (req, res) => {
    Employee.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
        .then((err, employee) => {
            logger.info('OK');
            res.status(200).send(employee);

        })
        .catch((err, user) => {
            return res.status(500).send("Problem with adding employee");
        })
}


getAllEmployees = (req, res) => {
    Employee.find({}, (err, employees) => {
        console.log(employees);
        if (err) return res.status(500).send("There was a problem finding the employees.");
        res.status(200).send(employees);
    });
}

getEmployeeById = (req, res) => {
    Employee.findById(req.params.id, (err, employee) => {
        if (err) return res.status(500).send("There are problem finding employee");
        if (!employee) return res.status(404).send("No  user found");
        else res.status(200).send(employee);
    })
}


deleteEmployee = (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, employee) => {
        if (err) return res.status(500).send("There are problem finding employee");
        if (!employee) return res.status(404).send("No  employee found");
        else res.status(200).send(employee);
    })
}

updateEmployee = (req, res) => {
    Employee.updateOne({ _id: req.params.id }, req.body, { upsert: true })
        .then(employee => {
            logger.info('Successfully saved changes!')
            res.status(200).send(employee)
        })
        .catch((err, employee) => {
            logger.error('Cannot update employee!')
            return res.status(500).send('Cannot update employee!');
        })
}

module.exports = {
    getAllEmployees,
    addEmployee,
    getEmployeeById,
    deleteEmployee,
    updateEmployee
}