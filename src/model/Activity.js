const mongoose = require('mongoose');

//define schema
const ActivitySchema = mongoose.Schema({});

//export schema as model
module.exports = mongoose.model('Activity', ActivitySchema);
