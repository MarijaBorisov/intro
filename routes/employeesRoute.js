var express = require('express');
var router = express.Router();

var Employee = require('../components/employee/EmployeeController');

router.get('/', Employee.getAllEmployees);
//aggregation
router.get('/getEmloyees', Employee.getAllEmployeesName);
router.get('/sumOfSalary', Employee.sumOfSalary);
router.get('/getDifferenceBetweenDates', Employee.getDifferenceBetweenLastCompanyStartDate);
router.get('/differenceBetweenTwoTimestamp', Employee.getDifferenceBetweenTwoTimestamp);
router.get('/getYearMonthHours', Employee.getYearMonthHours);
router.get('/:id', Employee.getEmployeeById);
router.post('/', Employee.addEmployee);
router.delete('/:id', Employee.deleteEmployee);
router.put('/:id', Employee.updateEmployee);




module.exports = router;