// Middleware controller for /employees requests

const DBLayer = require('../services/DBLayer') // Database access layer for CRUD requests

const express = require('express') // import request
const router = express.Router() // new instance of Router class from express
const DBManager = new DBLayer() // new instance of database access layer 

// Handler for GET method for page: url/employees
router.get('/', (req, res) => {
    // get all employees from database
    DBManager.getAll((data) => { // success function (when program runs without errors)
        // render allEmployees.pug with received data
        res.render('allEmployees', {title: "All employees", employees: data})
    }, 
    (error) => { // fail function (when program fails and error occurs)
        res.status(500) // status code of application is changed to 500
        res.send(error) // and error message is sent to user
    })
})

// Handler for url/employees/Add GET method
router.get('/Add', (req, res) => {
    res.render('addEmployee', {title: "Add"}) // show page with form for creating new employee
})

// Handler for the same link but for POST method
router.post('/Add', (req, res) => {
    // Use addEmployee method od Database layer class
    DBManager.addEmployee(req.body, // send req.body with all information gained from user input 
        () => res.render("addEmployee", {Success: true}), // if user wass added and program worked without errors
        (error) => { // if error occured
            res.status(500)
            res.send(error)
        })
})

// Handler for url/employees/IdOfEmployee
router.get('/:employeeID', (req, res) => {
    // in order to get one employee getOneEmployee method of database layer class is used
    DBManager.getOneEmployee(
        Number.parseInt(req.params.employeeID), // ID of needed employee is sent to this method
        (Data) => { // if success, render employee.pug with given parametrs to use
            res.render('employee', {title: Data.Name, employee: Data})},
        (error) => { // if error occurs
            res.status(500)
            res.send(error)
        })
})

module.exports = router // export router when this file is imported to other projects