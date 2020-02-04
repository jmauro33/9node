const inquirer = require ("inquirer");
const axios = require ("axios");
const fs = require ("fs")
const questions = [
  
];

function writeToFile(fileName, data) {
 fs.writeFile(fileName,data,function(err){
     if (err)console.log (err)
 })

}

function init() {
inquirer
    .prompt ([

        {
            type: "input",
            message: "Whats your favorite color?",
            name: "color"
          },
        {
            type: "input",
            message: "Whats your github username?",
            name: "username"
          },
        
    ])

.then(function(response) {

console.log (response.username)
axios.get("https://api.github.com/users/"+response.username)

.then(function(github) {
console.log (github.data)
writeToFile("profile.txt",JSON.stringify(github.data));
})

})

}






init();



