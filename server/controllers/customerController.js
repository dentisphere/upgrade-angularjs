var customers = require('../database/customers'),
    getNextId = require('./getNextId');

var nextId = getNextId(customers);

exports.getCustomers = function(req, res) {
    res.send(customers);
};

exports.getCustomerById = function(req, res) {
    var index = req.params.id - 1;
    res.send(customers[index]);
};

exports.getCustomersByUser = function(req, res) {
    res.send(customers.filter(customer => customer.userId === parseInt(req.params.id)));
};

exports.updateCustomer = function(req, res) {
    var customerToUpdate = req.body;
    var index = customers.findIndex(customer => customer.id === customerToUpdate.id);
    if (index >= 0) {
        customers[index] = customerToUpdate;
        res.send(customerToUpdate);
        res.end();
    } else {
        exports.createCustomer(req, res);
    }
};

exports.createCustomer = function(req, res) {
    var newCustomer = req.body;
    newCustomer.id = nextId;
    nextId++;
    customers.push(newCustomer);

    res.send(newCustomer);
    res.end();
};
