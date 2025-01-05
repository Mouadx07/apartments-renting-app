import React, { useEffect, useState, useContext } from 'react'
import Listing  from '../../components/Listing'
import './Profile.css'
import { MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {getUserProfile, getApartment} from '../../utils/api'
import Booking from '../../components/Booking';

const Profile = () => {
  const {userId} = useContext(AuthContext);
  const [listings, setListings] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  function handleDelete(id){
    setListings(l=>l.filter(apartment => apartment._id!=id));
  }
  useEffect(()=>{
    
    
    getUserProfile(userId).then(data=>{
      //console.log(data.result.user)
      setUser(data.result.user)
      setListings(data.result.apartments)
      setBookings(data.result.bookings)
      setLoading(false);
      //console.log(user)

    })

  }, [])
  function available(listing){
    
    if (listing.bookings.length>0){
      //console.log(Date.now()<Date.parse(listing.bookings[0].ends))
      return Date.now()>Date.parse(listing.bookings[0].ends)
      
    }
    return true
  }
  return (
    <>{!(loading==3)
    ?<div>
        <div className="profile-create">
            <h1>Profile.</h1>
            
            <Link to="create-listing">  <MdAdd style={{size: '2em'}}/> Create Listing
            </Link>
        </div>
        
        <h2>Your Listings</h2>
        <div className='listings-container'>
        {listings&&listings.map((listing, i) => <Listing key={i} img={listing.image} renter={user.name} price={listing.price} available={available(listing)?'Available':'Not Available'} address={listing.address} id={listing._id} onClick={() => {}} onDelete={handleDelete}/>)}
        
        </div>
        <h2>Your Bookings History</h2>
        <div className='bookings-container'>
        {bookings&&bookings.map(booking=><Booking nights={booking.nights} start={booking.starts} end={booking.ends} img={booking.apartment.image} price={booking.apartment.price} address={booking.apartment.address}/>)}        
        </div>
    </div>
    :<div></div>}
    </>
    
  )
}

export default Profile