import mongoose from "mongoose";

const {Schema} = mongoose;

const bookingSchema = new Schema({
    starts: {type: Date, required: true},
    ends:{type: Date, required: true},
    nights: {type: Number, required: true},
    user: {type: Object, required: true},
    apartment: {type: Object, required: true},
    
})

export const  Booking = mongoose.model('Booking', bookingSchema);