const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema

const titleSchema = new Schema ({

})

// Export the model so it can be accessed.

const Title = mongoose.model('Title', titleSchema);
module.exports = Title;