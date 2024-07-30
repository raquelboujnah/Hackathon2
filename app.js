const express = require("express");
const cors = require("cors");
const path = require('path')
const router = require('./routes/fitness.routes.js');
const {fetchAllApi} = require("./config/fitness.config.js")

const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',express.static(path.join(__dirname, 'public')));

app.use(cors())

app.listen(process.env.PORT || 5000, (req, res) => {
    console.log(`run on ${process.env.PORT || 5000}`);
});

//defining the root and the router
app.use('/fitness', router);

//calling only once to insert the data just once:
// fetchAllApi()
