const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carName: String,
    carType: String,
    city: String,

    status: {
      type: String,
    },

    pickupDate: Date,
    returnDate: Date,

    pricePerDay: Number,
    totalAmount: Number,

    bookingId: String,
  },
  { timestamps: true },
);

const MyBooking = mongoose.model("Booking", bookingSchema);

module.exports = MyBooking;
