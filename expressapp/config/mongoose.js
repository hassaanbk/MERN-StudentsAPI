var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    const db = mongoose.connect(config.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('DB Connected'))
        .catch(err => console.log(err));
    
    require('../models/student.server.model');

    return db;
};