const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const convertFactory = require('electron-html-to');
const generateHTML = require("./generateHTML.js")
const pdfWriter = convertFactory({
    converterPath: convertFactory.converters.PDF
});

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) console.log(err)
    })

}

function init() {
    inquirer
        .prompt([

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

        .then(function (response) {

            console.log(response.username)
            axios.get("https://api.github.com/users/" + response.username)
                .then(function (github) {
                    console.log(github.data)
                    var neededinfo = {
                        profile_pic: github.data.avatar_url,
                        username: github.data.login,
                        location: github.data.location,
                        bio: github.data.bio,
                        public_repos: github.data.public_repos,
                        followers: github.data.followers,
                        git_stars: github.data.git_stars,
                        following: github.data.following,
                        html_url: github.data.html_url,
                        blog: github.data.blog,
                        color: response.color
                    }

                    let html = generateHTML(neededinfo)

                    pdfWriter({ html }, function (err, result) {
                        if (err) {
                           
                            return console.error(err);
                        }

                        result.stream.pipe(fs.createWriteStream('./profile.pdf'));
                        pdfWriter.kill();
                    });
                })
        });
}






init();



