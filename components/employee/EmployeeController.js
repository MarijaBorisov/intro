var express = require('express');
var logger = require('../../utils/logs/winston')
var Employee = require('../employee/Employee');

addEmployee = (req, res) => {
    Employee.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        department: req.body.department,
        salary: req.body.salary,

        dateOfBirth: req.body.dateOfBirth,
        // dateOfBirth: new Date(req.body.dateOfBirth).toLocaleISO();

        companyStartDate: req.body.companyStartDate
    })
        .then((err, employee) => {
            // console.log(req.body.dateOfBirth);
            logger.info('OK');
            console.log(employee);
            res.status(200).send(employee);
        })
        .catch((err, user) => {
            // return res.status(500).send("Problem with adding employee");
            console.log(err);
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
        if (err) return res.status(500).send(err);
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

getAllEmployeesName = (req, res) => {
    Employee.aggregate(
        [
            { $match: { username: { $exists: true } } },
            { $project: { _id: 0, username: 1 } }
        ]
    ).then((employees) => {

        res.send(employees)
    }).catch(function (err) {
        res.status(404).send("Cannot find employees");
    })
}
sumOfSalary = (req, res) => {
    Employee.aggregate([

        {
            $group: {
                "_id": null,
                total_salary: { $sum: "$salary" },
                count: { $sum: 1 },
                avg_year: { "$avg": "$salary" }
            }
        }
    ]).then((employees) => {
        res.send(employees)
    }).catch(function (err) {
        console.log(err);
    })
}

getDifferenceBetweenLastCompanyStartDate = (req, res) => {

    Employee.aggregate([
        { $sort: { _id: -1 } },
        { $limit: 2 },
        {
            $group: {
                _id: 1,
                firstDate: { $first: "$$ROOT" },
                lastDate: { $last: "$$ROOT" }
            }
        },
        {
            $project: {
                _id: 1,
                dateDifference: { $abs: { $subtract: ["$firstDate.companyStartDate", "$lastDate.companyStartDate"] } }
            }
        }
    ])
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            console.log(err);
        })
}
getDifferenceBetweenTwoTimestamp = (req, res) => {
    Employee.aggregate([
        { $sort: { _id: -1 } },
        { $limit: 2 },
        {
            $group: {
                _id: 1,
                createdAtFirst: { $first: "$$ROOT" },
                createdAtLast: { $last: "$$ROOT" }
            }
        },
        {
            $project: {
                _id: 1,
                createdAt: 1,
                dateOfBirth: 1,
                // createdDifference: { $abs: { $subtract: [{ $second: "$createdAtFirst.createdAt" }, { $second: "$createdAtLast.createdAt" }] } }
                createdDifference: { $abs: { $subtract: ["$createdAtFirst.createdAt", "$createdAtLast.createdAt"] } }
            }
        }

    ])
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.send(err);

        })
}
getYearMonthHours = (req, res) => {
    Employee.aggregate([{
        $project: {
            createdAt: 1,
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            hour: { $hour: { date: "$createdAt", timezone: 'Europe/Belgrade' } }, minutes: { $minute: { date: "$createdAt", timezone: 'Europe/Belgrade' } }, seconds: { $second: { date: "$createdAt", timezone: 'Europe/Belgrade' } }
        }

    }

    ]).then((users) => {
        res.send(users);
    })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    getAllEmployees,
    addEmployee,
    getEmployeeById,
    deleteEmployee,
    updateEmployee,
    getAllEmployeesName,
    sumOfSalary,
    getDifferenceBetweenLastCompanyStartDate,
    getDifferenceBetweenTwoTimestamp,
    getYearMonthHours
}