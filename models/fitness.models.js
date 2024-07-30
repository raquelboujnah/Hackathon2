const db = require('../config/db.js');
const bcrypt = require("bcrypt")

//hasing the password and insert the data user from the form to the table, after handling errors 
const _userRegister = async(username, user_password, email, height, weight, gender, bmistatus) => {
    const password = await bcrypt.hash(user_password + '', 10);
    return db("users")
    .insert({username, password, email, height, weight, gender, bmistatus}, ["id", "username", "password", "email", "height", "weight", "gender", "bmistatus"]);
}

//update the intensity after the user sumbit where username
const _updateIntensity = (intensity, username) => {
    console.log(intensity, username);
    return db("users")
    .update({intensity: intensity})
    .where({username: username})
}

//select the user password where username for comparasion, and username and intensity for the main page
const _userLogin = async(username) => {
    try{
        return db("users")
        .select("username", "password", "intensity")
        .where({username: username})
    }catch(err){
        console.log(err);
        return false
    }
}

//select 3 exercises randomly where difficultty
const _getExerciseDay = (difficulty) => {
    return db("exercises")
    .select("name", "type", "muscle", "equipment", "difficulty", "instructions")
    .where({difficulty: difficulty})
    .orderByRaw('RANDOM()')
    .limit(3)
}

//select 3 recepies randomly
const _getRecepiesDay = () => {
    return db("recepies")
    .select("title", "ingredients", "servings", "instructions")
    .orderByRaw('RANDOM()')
    .limit(3)
}

module.exports = {
    _userRegister,
    _userLogin,
    _getExerciseDay,
    _getRecepiesDay,
    _updateIntensity,
}
