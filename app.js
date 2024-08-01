const express = require("express");
const cors = require("cors");
const path = require('path')
const router = require('./routes/fitness.routes');

const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',express.static(path.join(__dirname, 'public')));

app.use(cors())

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log(`run on ${process.env.PORT || 3000}`);
});

//defining the root and the router
app.use('/fitness', router);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/main.html"))
})

//calling only once to insert the data just once:
// fetchAllApi()
