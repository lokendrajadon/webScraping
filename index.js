const express = require('express')
const ejs = require('ejs')
const app = express()
const path = require('path')

const bodyParser = require('body-parser');
const mongoose = require("mongoose");

app.set('view engine', 'ejs')
app.set('views', 'views')


mongoose
    .connect('mongodb://localhost:27017/trendingVideos', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((error) => {
        console.log(error);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/videoDetails',express.static(path.join(__dirname, 'public')));

const routes = require('./routes/videoRoutes')

app.use(routes)
const port = process.env.PORT || 8080
app.listen(port, (req, res) => {
    console.log(`server is running on this port ${port}`)
})