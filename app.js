// get needed modules
const express = require('express')

// Initializing needed instances of classes (express) and initializing a PORT
const app = express()
const employeesRouter = require('./Routes/Employees') // router for /employees
const indexRouter = require('./Routes/index') // router for requests to main page
const PORT = 8000

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'pug') //use pug files as an html generator
app.use('/static', express.static('./public')) // path to styles
app.use('/employees', employeesRouter) // Router for employees
app.use('/', indexRouter) // use router for main page


// Start application
app.listen(PORT, (error) => {
    if (error) console.log(error) // if errors occur, let user know
    console.log("Server is being started on PORT: " + PORT) // let user know that application works
})
