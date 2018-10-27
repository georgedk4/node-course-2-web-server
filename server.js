const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

/*
app.get('/', function(req, res) {
    //res.send('<h1>Hello Express!</h1>');

    res.send({
        name: 'Andrew',
        likes: [
            'Biking',
            'Cities'
        ]
    });
});

app.get('/about', function(req, res) {
    res.send('About Page');
});

app.get('/bad', function(req, res) {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});
*/

hbs.registerPartials(__dirname + '/views/partials');                    //tell handlebars that we want to use the partials stored in /views/partials
app.set('view engine', 'hbs');                                          //tell express to use the handlebars view engine
app.use(function(req, res, next) {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', function(error) {
        if(error) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
app.use(function(req, res, next) {
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function() {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text) {
    return text.toUpperCase();
});

app.get('/', function(req, res) {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
        //currentYear: new Date().getFullYear()
    });
});

app.get('/about', function(req, res) {
    res.render('about.hbs', {
        pageTitle: 'About Page'
        //currentYear: new Date().getFullYear()
    });
});

//app.listen(3000);
app.listen(port, function() {
    console.log('Server is up on port ' + port + '');
});