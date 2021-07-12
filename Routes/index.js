const express = require('express')
const router = express.Router()
const fs = require('fs')
const DBPath = require('../consts').DatabasePathInner

// Basic API for GET method
router.get('/api/v1/EmployeesList', (req, res) => {
    fs.readFile(DBPath, (err, data) => {
        if (err) throw err // if error occurs then throw it
        const allEmployees = JSON.parse(data) // parse JSON object read from file to js object
        res.json(allEmployees) // send object to user
    })
})

// Instructions page
router.get('/instructions', (req, res) => {
    const title = 'Instructions'
    res.render('instructions', {title: title})
})

// Home page
router.get('/', (req, res) => {
    const title = 'Home Page'
    res.render('index', {title: title})
})

module.exports = router