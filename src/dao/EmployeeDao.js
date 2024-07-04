const models = require('../models');
const SuperDao = require('./SuperDao');

const Employee = models.Employee;

class EmployeeDao extends SuperDao {
    constructor() {
        super(Employee);
    }
}

module.exports = EmployeeDao;