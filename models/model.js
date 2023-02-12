const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    is_completed: {
        type: Boolean,
        required: true
    },
    end_date:{
        type:String,
        required: true
    },
});
const Model = mongoose.model('Data', dataSchema);
module.exports = Model;