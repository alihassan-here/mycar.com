const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    category: {
      required: true,
      type: String,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: [Map],
    },
    mileage: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    registerationNo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please add a user."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
