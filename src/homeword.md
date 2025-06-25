# DevTinder Development Journey

## Initial Setup
- Create a repository
- Initialize the repository
- Find the difference between node_modules, package.json and package-lock.json 
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test ./hello
- Install nodemon and update scripts inside package.json 



### Step
 1: Create a new folder and initialize git & npm
```bash
mkdir my-express-app
cd my-express-app
git init                          # Initialize a Git repository
npm init -y                       # Generate package.json file
```



### Step 2: Install Express
```bash
npm install express               # Adds express to dependencies
```

### Step 3: Install nodemon for development (auto-restarts on changes)
```bash
npm install --save-dev nodemon   # Adds nodemon to devDependencies
```




## Day 4 - Git & Routing Fundamentals
### Git Setup
- Initialize git
- Create .gitignore
- Create a remote repo on github
- Push all code to remote origin 

### Routing Exploration
- Play with route and extensions 
- Order of the routes matter a lot
- Install postman app and make a workspace/collection → test api call
- Get logic to handle get, post, put, patch
- Explore different types of routing use of ?, *..etc
- Use of regex in routes /a/ /.*fly#/..etc
- Reading the query params in the routes
- Reading the dynamic routes 




## Day 5 - Middleware & Route Handlers
### Advanced Route Handling
- Multiple Route Handlers
- next()
- next function and errors along with res.send()
- What is middleware 
- How express js handles requests behind the scenes 

### Middleware Implementation
- Write a dummy auth middleware for admin 
- Write a dummy auth middleware for all user routes except /user/login
- Error Handling using app.use




## Day 6 - Database Integration
### Database Setup
- Create a free cluster
- Install mongoose library
- Connect your application to the database connection url devtinder
- Call the connectdb function and connect to database before starting application on 7777

### User Schema & API
- Create a user Schema
- Create a signup API to add data to database





## Day 7 - CRUD Operations & Data Handling
### Data Concepts
- JS object vs json difference
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end user

### Database Methods
- Find and findOne method details, uses, syntax and result 
- Try different functions at least most common ones
- What are options in a model.findOneAndUpdate
- Explore the mongoose method documentation

### API Development
- **API**: Get user by email
- **API**: Feed API - GET/feed - get all the users from the database
- **API**: GET user by ID  
- **API**: Create delete user API
- **API**: Create Update user API
- **API**: Update user with email ID
- Difference between patch and put 





## Day 8 - Schema Validation & Data Sanitization
### Schema Enhancement
- Explore Schema type from documentation
- Add required, unique, ...etc field explore them
- Add default
- Add custom Validators functions
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropriate validations on each field in schema
- Add timestamps to the user Schema 

### Data Validation
- Add API level validations on put and patch request
- Study about data sanitization
- Add API level validation for each field of schema - Data Sanitization
- Install Validator 
- Explore Validator Library function and use Validator funcs for password, email ..etc
- **Important**: Never Trust req.Body

## Day 9 - Password Security & Authentication
### Password Encryption
- Create a helper function
- Install bcrypt package
- Create passwordHash using bcrypt.hash & save the user with encrypted password 

### Login Implementation
- Create Login API
- Compare passwords and throw errors if email or passwords is invalid 




## Day 10 - JWT Authentication & Session Management
### Cookie Management
- Install cookie parser
- Just send a dummy cookie parser
- Create get/profile API and check if you want the cookie back 

### JWT Implementation
- Install jsonwebtoken 
- In login API, after email and password validation, create a JWT token and send it to user
- Read the cookies inside your profile API and find the logged in user 
- Read the cookie inside your profile api and find the logged in user

### Middleware & Security
- userAuth Middleware 
- Add the userAuth middleware in profile API and a new setConnection request API
- Set the expiry of JWT token and cookies to 7 days 

### Schema Methods
- Create user schema method to get jwt token 
- Create user schema method to compare passwords 






## Day 11 - API Organization & Routing Structure
### API Planning
- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder

### Router Implementation
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request routers
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js


## Day-12 
### Homwork
Cretae Connection request Schema 
Send Connection request Api
Proper Validation of Data 
Think about All corner Cases 
$ Query , $or Query $and Query ..etc ..read about it 

What are indexes in MongoDB 
Why do we need Indexes 
Explore Compound indexing 
Why is Unnecessary indexing costly. 
Advanatages and Disadvantages in Indexing 
Think of inverse Querying also ..means users who don't pass this query 
