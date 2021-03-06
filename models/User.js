const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    password: String,
    role: String,
    name: String,
    profilePicture: String,
    email: String,
    aboutMe: String,
    typeOfTherapy: String,
    description: String,
    photos: String,
    address: String,
    phoneNumber: Number,
    favourite: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ], 
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  
  {    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
