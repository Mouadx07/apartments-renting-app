import express from 'express';
import mongoose from 'mongoose';
import {User} from './models/User.js'
import { Apartment } from './models/Apartment.js';
async function connectDb(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/apartments-renting');
        console.log('connected successfuly')
       // setTimeout(10, ()=>{})
    }
    catch (error){
        console.log(`Error connecting to Db: ${error}`)
    }
}

connectDb();
const user = new User({
    name: 'mouad',
    email: 'test@gmail.com',
    phone: '2233442321',
    password: '123456'
})
await user.save();
// const apartment = new Apartment({
//     address: 'mouad',
//     email: 'test@gmail.com',
//     phone: '2233442321',
//     password: '123456'
// })
//await user.save();
console.log("User created:", user);