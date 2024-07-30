const { registerFile, loginFile, mainFile, userRegister, userLogin, getExerciseDayBeginner, getExerciseDayintermediate, getExerciseDayExpert, userIntensity, getRecepiesDay} = require("../controllers/fitness.controllers")
const express = require('express');
const router = express.Router();

//get route for 3 random beginner exercises
router.get("/beginnerExercises", getExerciseDayBeginner);

//get route for 3 random intermediate exercises
router.get("/intermediateExercises", getExerciseDayintermediate); 

//get route for 3 random expert exercises
router.get("/expertExercises", getExerciseDayExpert); 

 //get route for 3 random recepies
router.get("/recepies", getRecepiesDay);

//get route for the register.html
router.get("/register", registerFile); 

//get route for the login.html
router.get("/login/", loginFile); 

//get route for the main.html
router.get("/main", mainFile); 

//post route for the register form
router.post("/register", userRegister); 

//post route for update
router.post("/intensity", userIntensity);

// post route for login form
router.post("/login", userLogin);

module.exports = router

