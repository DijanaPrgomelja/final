const { Schema, model } = require("mongoose");

const reviewSchema = new Schema ({
    reviewText: String,
    reviewTherapist: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewAuthorUsername: 'String'
})

const Review = model("Review", reviewSchema);

module.exports = Review;