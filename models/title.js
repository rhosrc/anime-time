const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema

const reviewSchema = new Schema({
    text: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    }
  }, { timestamps: true });

const titleSchema = new Schema ({
    mal_id: Number,
    url: String,
    images: {
        jpg: {
            image_url: String
        }
    },
    title: String,
    airing: Boolean,
    aired: {
        string: String
    },
    synopsis: String,
    type: String,
    episodes: Number,
    score: Number,
    start_date: String,
    end_date: String,
    members: Number,
    rating: String,
    reviewed: {type: Boolean, default: false},
    epsfinished: {type: Number, default: 0},
    reviews: [reviewSchema]
}, {timestamps: true})


// Export the model so it can be accessed.

const Title = mongoose.model('Title', titleSchema);
module.exports = Title;