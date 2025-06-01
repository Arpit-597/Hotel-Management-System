const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    checkin: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date,
        required: true
    },
    guests: {
        type: String,
        required: true
    },
    addServicePerBooking: { 
        type: Boolean,
        default: false
    },
    addServicePerPerson: {
        type: Boolean,
        default: false
    },
    totalPrice: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;