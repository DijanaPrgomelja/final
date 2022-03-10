const { Schema, model } = require("mongoose");

const reviewSchema = new Schema ({
    reviewText: String,
    reviewTherapist: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Review = model("Review", reviewSchema);
module.exports = Review;