const validator=require("validator");


const validateSignUpData = (req)=>
{
const  {firstName,lastName,email,password} =req.body;


if(!firstName || !lastName)
{
    throw new Error ("Name is not valid!");
}
else if(firstName.length<4  ||  firstName.length>50)
{
    throw new Error("firstName should be 4-50 characters");
}
else if(!validator.isEmail(email))
{
throw new Error("Eamil is not valid");
}
else if(!validator.isStrongPassword(password))
{
   throw new Error("Password is not strong"); 
}
};


const validateEditProfileData = (req)=>
{
    const allowedEditFields= ["firstName", "lastName", "age", "gender"];

    const isEditallowed=Object.keys(req.body).forEach((key) => {
        if (!allowedEditFields.includes(key)) {
            throw new Error(`Field ${key} is not allowed to edit`);
        }
    });

    return isEditallowed;
}
     

module.exports =
{
    validateSignUpData,
    validateEditProfileData,
}