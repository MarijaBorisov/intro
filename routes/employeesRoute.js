var express = require('express');
var router = express.Router();

var Employee = require('../components/employee/EmployeeController');

router.get('/', Employee.getAllEmployees);
router.get('/:id', Employee.getEmployeeById);
router.post('/', Employee.addEmployee);
router.delete('/:id', Employee.deleteEmployee);
router.put('/:id', Employee.updateEmployee);

module.exports = router;