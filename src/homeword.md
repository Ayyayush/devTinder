// create a repository
// inititalize the repositiory
// find the difference between noode modules,package .json and package .lock .json 
// install express
// create a server
// listen to port 7777
// Write request handlers for /test ./hello
// Install nodemon and update scripts inside package .josn 


# Step 1: Create a new folder and initialize git & npm
mkdir my-express-app
cd my-express-app
git init                          # Initialize a Git repository
npm init -y                       # Generate package.json file

# Step 2: Install Express
npm install express               # Adds express to dependencies

# Step 3: Install nodemon for development (auto-restarts on changes)
npm install --save-dev nodemon   # Adds nodemon to devDependencies




// Day-4 Homework
inititalize git
.gitignore
create a remote repo on github
push all code to remote origin 
play with route and extensions 
order of the routes matter a lot
install postman app and make a workspace / collection ->   test api call
Get logic to handle get,post,put,patch
explore different types of routing use of ?,*..etc
use of regex in routes /a/   /.*fly#/..etc
reading the query params in the routes
reading the dynamic routes 




//Day -5
Multiple Route Handlers
next()
next function and errors along with res.send()
what is middle ware 
how express js handles requests behinfd the scenes 
Write a dummy auth middleware for admin 
Write a dummy auth middleware for all user routes except /user/login
Error Handling using app.use


// Day-6
Create a free cluster
install mongoose library
connect your application to the database connection url devtinder
call the connectdb function and connect to databse before starting application on 7777
create a user Schema
create a signup API to add data to database


Day -7
Js object vs json difference
Add the exprfess.json middleware to your app
Make your signup API dynamic to recieve data from the end user


