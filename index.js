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
    blog: github.data.blog

}
writeToFile("profile.txt",JSON.stringify(neededinfo));
})

})

}

//* Profile image
//* User name
// * Links to the following:
//   * User location via Google Maps
//   * User GitHub profile
//   * User blog
// * User bio
// * Number of public repositories
// * Number of followers
// * Number of GitHub stars
// * Number of users following




init();



