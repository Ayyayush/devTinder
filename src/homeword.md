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
