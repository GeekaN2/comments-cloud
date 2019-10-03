var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// MongoDB
//mongoose.connect('mongodb://localhost:27017/comments-cloud', {useNewUrlParser: true, useUnifiedTopology: true });


// routes

router.get('/', function(req, res, next) {
    res.render('console');
});

module.exports = router;
