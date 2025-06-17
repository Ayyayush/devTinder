const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength:4,
    maxlength:50,
  },
  lastName: {
    type: String,
  },
  email: {
    // Changed from emailId to email for consistency
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    trim:true,
  },
  password: {
    // Changed from passWord to password for consistency
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min:18,
  },
  gender: {
    type: String,
    validate(value)
    {
        if(!["male","female","others"].includes(value))
        {
throw new Error("Gender is not valid");
        }
    },
  },
  photoUrl: {
    type: String,
    default:"data:image/webp;base64,UklGRhADAABXRUJQVlA4IAQDAAAwIACdASq+AL4APp1OoEqlpKMhqhiIuLATiWlu3WBpKHuUOI7QLsxlNg2uRAsLnou/T/EDRhte3mCuXbjayAtR9IPfTyfh+EamPJO1zi0ce6RHvJ9Gqz+haPoJYnsu7NgqM/gXunbKrydx2zUDh7xuAcSTil5D3k+Wk1fqS5n94ZSRovZ4NuqEP79tN5iHWoSTHbBbuTRXCebYhbaHZ1b+UYht1VTJJqoL+I32z6t9w4YbYlzbhZ5tvMTJyxPNU9K8gEBdgBBu/OVtuOgPng8my+Znk/9lV6+fF3pnEJwQYe0P2m6dbMKRLphZg73y4E5COVT7LBt90MNDxIhVK2G0chFq4YaPWeHggAD+9co7fb9/RmCpSB1801MVKXb7On+sNCTc8Z9X/biIc4vdLHa0ub5bDn52F8VWx9XTI53jCfY5Pkijlo2vqcnOkFB1ebzKB7k7RIx0+rRdHIK0d0ocdF/ScuLGNRSuH2uyXwqV15bbj6gjDk7wy3sERAnoFZb6wdlgUPIlljMSHZeHLYBkWFUzsHq3ay0/xgsykqevLhGrXfnkRC91jpaHQnXpwz7M4odcDNpFSXnGM+oUj53BrdtpBHHN8xlPx4Q7s49SMCHMZ2ROIWyed0evuLsf/LRhrG5IWnWqEVtNbFB0pA1K8biE8WcSt8QjJiHHvCOSTMAbT1O6yPmzw73xesOTJwlTYq1ZAUfHge+sJcKVvutwM6wM7O1PdT+bDVmEvXsP9zkBvtu730jT0jhDFOlD360H83Ys9Htkpdbe8cNHjzmPvh2j5BI19cKsVV9z0goBdw8S0Uu6pmL+/0nkycsLg4YtbelieYDBS9y+HzfpsD+jdUc90fWBYD179LV5ZJ0+5L5yAhuxdJVuZuKCWjA5XZBzkMiZy3RQtOsX4fL2AxxXj3t2GHzeHraRVTmwbsvwDelirO6kalZ1okgGE4DAZlc0z5MmSbqT/52LiJT/4W7YKbaYVBrHKOXDSQvjj72j1SLiTW/CL+kHMYHOJtjPTNDkG8AA"
  },
  about: {
    type:String,
    default:"This is a default about of the user!",
  },
  skills:
  {
    type:[String]
  },
},
  {
    timestamps:true,
  }
);

module.exports = mongoose.model("User", userSchema);
