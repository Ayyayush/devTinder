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
Find and findone method details ,uses ,syntax and rexsult 
API-Get user by email
API- Feed API - GET/feed - get all the users from the database
Try different functions atleast most common ones
API- GET user by ID  
Diff bewteen patch and put 
Create delete user API
Create Update user API
What are options in a model.findOneANDUpdate
Explore the mongoose method documentation
API-UpdateThuser with email ID




Day-8
Explore Schema type from documentation
Add required,unique,...etc feild explore them
Add default
Add custom Validators functions
Create a custom validate function for gender
Improve the DB schema- PUT all appropriatye validations on each field in schema
Add timestamps to the user Schema 
Add API level validations on put and patch request
Study about data sanitization
Add API level validation for each feild of schema - Data Sanitization
Install Validator 
Explore Validator Library function and use Validator funcs for password , email  ..etc
Never Trust req.Body



//Day-9
Create a helper function
Install bcrypt package
Create passwordHash using bcrypt.hash & save the user with encrypted password 
Creat Login API
Compare passwords and throw errors if email or passwords is invalid 



//Day-10
Install cookie parser
just send a dummmy cookie parser
create get/profile API and check if you want the cookie back 
install jsonwebtoken 
In login API , after email and password validation , create a JWT token and send it to user in 
read the cookies inside your profile API and find the logged in user 
read the cookie inside your profile api and find the logged in user
userAuth Middleware 
Add the userAuth middleware in profile API and a new setConnection request API
Set the expiry of JWT token and cookies to 7 days 
Create user schema method to get jwt token 
Create user schema method to compare passwords 
