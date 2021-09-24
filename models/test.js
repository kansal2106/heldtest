const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = new Schema({
    test_name: {
        type: String,
        required: true
    },
    test_id: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Test', testSchema);