const {_userRegister, _userLogin, _getExerciseDay, _getRecepiesDay, _updateIntensity} = require("../models/fitness.models");
const bcrypt = require("bcrypt");
const path = require("path");

//connecting html pages to the server
const registerFile = (req,res) => {
    res.sendFile(path.join(__dirname, "../public/register.html"))
}

const loginFile = (req,res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"))
}

const mainFile = (req,res) => {
    res.sendFile(path.join(__dirname, "../public/main.html"))
}

//user sign in, calculating BMI and return a message for displaying the BMI to the user while sign in, and username for updating intensity
const userRegister = (req, res) => {
    const {username, password, email, height, weight, gender} = req.body;
    const heightMetre = height.toString() * 0.01
    const BMI = weight / (heightMetre * heightMetre)
    let bmistatus = ''
    if (BMI < 18.5) {
        bmistatus = "Underweight";
    } else if (BMI >= 18.5 && BMI <= 24.9) {
        bmistatus = "Normal";
    } else if (BMI >= 25 && BMI <= 29.9) {
        bmistatus = "Overweight";
    } else if (BMI >= 30) {
        bmistatus = "Obese";
    }

    _userRegister(username, password, email, height, weight, gender, bmistatus)
        .then(result => {
            res.json({message: `Your bmi status is: ${bmistatus}`, username:result[0].username});
        })
        .catch((err) => {
            console.log(err);
            if (err.code === '23505') {
                res.status(400).json({message: 'Username or email already exists. Please try another.'});
            } else {
                res.status(500).json({message: "Something went wrong. Please try again later."});
            }
        });
}

//get the user intensity after submit and inserting his information, handling errors
const userIntensity = (req,res) => {
    const {intensity, username} = req.body
    _updateIntensity(intensity, username)
    .then(result => {
        res.json(intensity)
    })
    .catch((err) => {
        console.log(err);
        res.status(404).json({message: "something went wrong"})
    })
}

//login with username and password, comparing the password to the hash password, handling errors...
const userLogin = async(req, res) => {
    const {username, password} = req.body;
    try{
        const [loginStatus] = await _userLogin(username)
        if (loginStatus.length === 0) {
            return res.status(404).json({message: "Username not valid, try again."});
        }
        const passwordMatch = await bcrypt.compare(password+"", loginStatus.password);
        if(!passwordMatch){
            return res.status(401).json({error: "Wrong password"});
        }
        return res.json({message: `Welcom back ${username}`, username, intensity: loginStatus.intensity})
        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})     
    }
}

//get three exercise from a specific difficulty
const getExerciseDayBeginner = async(req, res) =>{
    try {
        const results = await _getExerciseDay("beginner");
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching exercises' });
    }
}

const getExerciseDayintermediate = async(req, res) =>{
    try {
        const results = await _getExerciseDay("intermediate");
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching exercises' });
    }
}

const getExerciseDayExpert = async(req, res) =>{
    try {
        const results = await _getExerciseDay("expert");
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching exercises' });
    }
}

//get three recepies
const getRecepiesDay = async(req, res) =>{
    try {
        const results = await _getRecepiesDay()
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching exercises' });
    }
}


module.exports = {
    userRegister,
    userLogin,
    mainFile,
    registerFile,
    userIntensity,
    loginFile,
    getExerciseDayBeginner,
    getExerciseDayintermediate,
    getExerciseDayExpert,
    getRecepiesDay
}