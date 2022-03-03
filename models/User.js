const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
   },
    password: String,
    role: String,
    firstName: String,
    lastName: String,
    profilePicture: String,
    email: String,
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
