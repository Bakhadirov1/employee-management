// function for getting MAX ID of employees

const fs = require('fs') // fileSystem for reading JSON
const DBpath = require('../consts').DatabasePathInner // path to JSON file


module.exports.IdGenerator = function() {
    var BiggestId = 0 // variable for largest ID
    const data = fs.readFileSync(DBpath) // get JSON object from JSON file
    const dataParsed = JSON.parse(data) // create variable with JSON object parsed to JS object
    BiggestId = Math.max.apply(Math, dataParsed.map(element => element.ID)) // filter for finding the largets ID in the Oject
    return (BiggestId + 1); // return the largest ID increased by 1, so it can be straightly used for creating new employee
}

