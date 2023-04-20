 const mongoose = require("mongoose");

const { Schema, model } = mongoose; // Destructure Schema and model from mongoose

const BookingSchema = new Schema(
  {
    Plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plans",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainers",
      default: null
    },
    dateOfBooking: {
      type: Date,
      default: Date.now,
    },
    expirationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Bookings", BookingSchema);
