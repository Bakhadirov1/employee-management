// this class is used to access Database

const fs = require('fs')
const DBpath = require('../consts').DatabasePathInner // path to JSON
const IDGenerator = require('./IDGenerator').IdGenerator // path to ID generator

class DBAccess { // DBAccess class
    constructor() {
        // constructor for new instances of DBAccess class
    }

    // Method for getting one employee (accepts ID of employe, success function and fail function)
    getOneEmployee(ID, successFunc, failFunc) {
        try{
            const Data = fs.readFileSync('./Database/Employees.json') // read from JSON
            const contentOfData = JSON.parse(Data) // Parse JSON object to JS object
            const neededEmployee = contentOfData.filter(employee => employee.ID === ID)[0] // Get ID of needed employee using filter method of OBJECT class
            successFunc(neededEmployee) // success function (usually it is rendering html engine page)
        }
        catch (error){
            failFunc(error) // what to do if try fails
        }
        
    }

    // Method for getting all employees from database, success and fail functions accepted
    getAll(successFunc, failFunc) { // logic is the same as with getOneEmployee() but filter is not used
        try {
            fs.readFile(DBpath, (err, data) => {
                if (err) throw err
                const contentOfData = JSON.parse(data)
                successFunc(contentOfData)
            })
        }
        catch (error) {
            failFunc(error)
        }
    }

    //Method for adding employee to database, additionally accepts object to be added to DB
    addEmployee(newData, successFunc, failFunc) {
        try {
            fs.readFile(DBpath, (err, data) => { 
                if (err) throw err

                const records = JSON.parse(data) // read old data and parse it to object

                records.push({ // add information about new employee in the end of the object
                    ID: IDGenerator(), // id generator is used for getting max ID
                    Name: newData.Name,
                    Age: parseInt(newData.age),
                    Nationality: newData.Nationality,
                    WorkingExperience: newData.Experience,
                    Description: newData.Description
                })
                
                // finally write data to JSON file
                fs.writeFile(DBpath, JSON.stringify(records), err => {
                    if (err) throw err
                    successFunc()
                })
            })
        }
        catch (error) {
            failFunc(error)
        }
    }
}

module.exports = DBAccess // Export DBAccess class whe this file is imported to other projects