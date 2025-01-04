import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true},
    email:{type: String, required: true, unique:true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    favorites: [
        {apartmentId: {type: String, required: true}}
    ]
})

export const  User = mongoose.model('User', userSchema);