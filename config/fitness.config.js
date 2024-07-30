// file for fetching all the api an insert them into database
const axios = require('axios');
const db = require("./db.js")

const recepies = `https://api.api-ninjas.com/v1/recipe?query=`
const exercises = "https://api.api-ninjas.com/v1/exercises?difficulty="

const apiKey = "zMrusg03RNtFvFM5A8QjIA==lxsOhuK8Me2D4Iat";

const exercisesData = []
const recepiesData = []

//fecth and insert them to a temporary object
const fetchApi = async (url, apiKey, data, query) => {
    try {
        const response = await axios.get(url + query, {
            headers: {
                'X-Api-Key': apiKey
            }
        });
        const exercises = response.data;
        data.push(...exercises); 
    } catch (error) {
        console.error('Error fetching exercises:', error);
    }
};


const insertData = async (table, data) => {
    try {
        await db(table).insert(data);
    } catch (error) {
        console.error('Error inserting exercise:', error);
    }
};

//resolve all and insert them to their table
const fetchAllApi = async () => {
    await Promise.all([
        fetchApi(exercises, apiKey, exercisesData, "beginner"),
        fetchApi(exercises, apiKey,exercisesData, "intermediate"),
        fetchApi(exercises, apiKey, exercisesData, "expert")
    ]);
    console.log("All exercises fetched.");
    await insertData("exercises", exercisesData);
    await Promise.all([
        fetchApi(recepies, apiKey, recepiesData, "salad"),
        fetchApi(recepies, apiKey, recepiesData, "quinoa"),
        fetchApi(recepies, apiKey, recepiesData, "bulgur"),
        fetchApi(recepies, apiKey, recepiesData, "chicken"),
    ]);
    console.log("All recepies fetched.");
    await insertData("recepies", recepiesData);
};


//export this to app.js 
module.exports = {fetchAllApi}

