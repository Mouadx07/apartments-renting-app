import mongoose from "mongoose";

const {Schema} = mongoose;

const apartmentSchema = new Schema({
    address: {type: String, required: true},
    image:{type: String, required: true},
    rooms: {type: Number, required: true},
    price: {type: Number, required: true},
    user: {},
    bookings: []
})

export const  Apartment = mongoose.model('Apartment', apartmentSchema);