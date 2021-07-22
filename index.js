const express = require('express')
const ejs = require('ejs')
const app = express()
const path = require('path')

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const morgan = require('morgan')
const fs = require('fs')
const helmet = require('helmet')
app.use(helmet({
    contentSecurityPolicy: false,
}))

const accessLogFileStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogFileStream }))
app.set('view engine', 'ejs')
app.set('views', 'views')

mongoose
    .connect('mongodb+srv://webScraping:youtubeTrendingVideos@cluster0.luidb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
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
app.use('/videoDetails', express.static(path.join(__dirname, 'public')));

const routes = require('./routes/videoRoutes')
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT",
    );
    next();
});

app.use(routes)
const port = process.env.PORT || 8080
app.listen(port, (req, res) => {
    console.log(`server is running on this port ${port}`)
})