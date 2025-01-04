import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path';
import cors from 'cors';
import {User} from './models/User.js'
import { Apartment } from './models/Apartment.js';
import { Booking } from './models/Booking.js';

const JWT_SECRET_KEY = "Mouad-Ayman-Amine"

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

connectDb()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cors());

// to upload apartment image 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1630564518954.jpg
    }
  });
const upload = multer({ storage: storage });

//User Routes
app.post('/api/register', async (req, res)=>{
//    console.log(req)
    const {name, email, phone, password} = req.body;
    console.log(req.body)
   
    try{
        const userExists = await User.findOne({email});
        console.log(userExists)
        if (userExists)
        return res.json({success:false, msg: "User email already exists"});
        const hashedPswd = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            phone,
            password: hashedPswd,
        })
        await user.save()
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '24h' });
        return res.status(201).json({ success: true, msg: "User registered successfully", token, user_id: user._id});
    }
    catch (error){
        return res.status(500).json({ msg: "Server error registering user"});
    }
    
})

app.post('/api/login', async (req, res)=>{
    const { email, password } = req.body;
   // console.log(req.body)
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success:false, msg: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success:false, msg: "invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '24h' });
    return res.status(200).json({
        success:true,
        msg: "Login successful",
        user_id: user._id,
        token: token, 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success:false, msg: "Server error" });
  }
})

app.get('/api/user/:id/profile', async (req, res)=>{
    const userId = req.params.id;
    try{
        const user = await User.findOne({_id: userId});
        //console.log(user)
        if (!user)
            return res.status(400).json({success: false, msg: "user id not found"})
        //return res.status(200).json({success: true,user});
        const apartments = await Apartment.find({user})
        const bookings = await Booking.find({user})
        return res.status(200).json({success: true, result:{user, apartments, bookings}});

    }
    catch (error){
        console.log(error)
        return res.status(500).json({success: false, msg: "server error"})
    }
})

//Apartment Routes

app.get('/api/apartments/all', async (req, res)=>{
    try {
        const apartments = await Apartment.find();
        return res.status(200).json({success: true, apartments})
    }
    catch (error){
        console.log(error);
        return res.status(500).json({success: false, msg: "server error"})
    }
})

app.get('/api/apartments/:id', async (req, res)=>{
    const _id = req.params.id;
    try {
        const apartments = await Apartment.findOne({_id});
        return res.status(200).json({success: true, apartments})
    }
    catch (error){
        console.log(error);
        return res.status(500).json({success: false, msg: "server error"})
    }
})
app.post('/api/apartments/store', upload.single('image'), async (req, res)=>{
    const {address, rooms, price, user_id} = req.body;
    const image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    //console.log(image);
    const user = await User.findOne({_id: user_id});
    try {
        const apartment = new Apartment({
            address, 
            image, 
            rooms, 
            price, 
            user,
            bookings: [],
        })
        await apartment.save();
        return res.status(200).json({success: true, msg: 'listed apartment successfuly', apartment})
    }
    catch (error){
        console.log(error);
        return res.status(500).json({success: false, msg: "server error"})
    }
})
app.post('/api/apartments/update', upload.single('image'), async (req, res)=>{
    const {id, address, rooms, price, user_id} = req.body;
    let image;
    if (req.file){    
        image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }    //console.log(image);
    else{
        image = req.body.image;
    }
    //console.log(image)
    const user = await User.findOne({_id: user_id});
    try {
        const apartment = await Apartment.replaceOne({_id: id}, { 
            address, 
            image, 
            rooms, 
            price, 
            user
        })
        //await apartment.save();
        return res.status(200).json({success: true, msg: 'updated apartment successfuly', apartment})
    }
    catch (error){
        console.log(error);
        return res.status(500).json({success: false, msg: "server error"})
    }
})
app.post('/api/apartments/delete', async (req, res)=>{
    const {id} = req.body;
    console.log(id)
    //return
    try{
        const apartment = await Apartment.findOneAndDelete({_id: id});
        return res.status(200).json({success: true, msg: 'deleted apartment successfuly', apartment})
    }
    catch (error){
        console.log(error);
        return res.status(500).json({success: false, msg: "server error"})
    }
})


// to book aparment
app.post('/api/book', async (req, res) => {
    const {nights, userId, apartmentId} = req.body;
    //console.log(apartmentId)
    const starts = new Date();
    const ends = new Date();
    ends.setDate(starts.getDate() + nights) 
 //   return
   // const ends = new Date
    try{
        const apartment = await Apartment.findOne({_id: apartmentId})
        //apartment.updateOne({})
        
        const user = await User.findOne({_id: userId})
        const booking = new Booking({
            starts,
            ends, 
            nights,
            user,
            apartment,
        })
        const bookingData = await booking.save()
        //console.log(bookingData)

        apartment.bookings = [...apartment.bookings, JSON.stringify(bookingData)]
        apartment.save()

        res.status(201).json({success: true, msg: "booked apartment successfuly", booking})
    }
    catch (error){
        console.log(error);
        return res.status(500).json({success: false, msg: "server error"})
    }
})

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`app is runing on http://localhost:${PORT}`)
})