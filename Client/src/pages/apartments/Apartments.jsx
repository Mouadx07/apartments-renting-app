import React from 'react'
import Listing from '../../components/Listing'
import './Aparments.css'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router";
import { getAllApartments } from '../../utils/api';
const Apartments = () => {
  // const listings = [
  //   { 
  //     id: 1,
  //     img: "/public/listing1.jpg",
  //     renter: "Mouad",
  //     price: "400",
  //     available: false,
  //     address: "Marrakech",
  //     phone: "+21267470405"

  //   },
  //   {
  //     img: "/public/listing1.jpg",
  //     renter: "Mouad",
  //     price: "400",
  //     available: true,
  //     address: "Marrakech"
  //   },

  // ]
  const [listings, setListings] = useState([]);
  useEffect(()=>{
    const data = getAllApartments().then(data=>{
      setListings(data.apartments)
      //console.log(data.apartments[0].user)
    })
    //setListings(data);
    
  }, [])
  
  const handleCardClick = (listing) => {

    navigate(`/apartment/${listing._id}`)    
  };


  let navigate = useNavigate();
  function available(listing){
    //console.log(listing.bookings)
    if (listing.bookings.length>0){
      return Date.now()>Date.parse(listing.bookings[0].ends)
    }
    return true
  }
  
  return (
    <div>

    <h2>Discover Apartments </h2>
    <div className="listings-container">
     
      {listings.map((listing, i)=><Listing key={i} img={listing.image} renter={listing.user.name} price={listing.price} available={available(listing)?'Available':'Not Available'} address={listing.address} onClick={() => handleCardClick(listing)}/>)}
      
      


    </div>
    </div>
  )
}

export default Apartments