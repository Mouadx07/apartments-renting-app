import React, { useEffect,useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router";

import './Reservation.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { getApartment, book } from '../../utils/api';
import { GrResume } from 'react-icons/gr';
import { AuthContext } from '../../context/AuthContext';

const Reservation = () => {
    
    const {id} = useParams()
    const {userId} = useContext(AuthContext)
    const [nights, setNights] = useState(1);
    const [price, setPrice] = useState(0);
    
    
    const [listing, setListing] = useState([])
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate();

    useEffect(()=>{
      //console.log('test')
      getApartment(id).then((data) => {
       // console.log(data.apartments)
        setListing(data.apartments);
        setPrice(data.apartments.price)
        setLoading(false)
      }
      )
    }, [])
    
  function handleChange(e){
    if (e.target.value>=1){
      setNights(e.target.value);
    setPrice(listing.price*e.target.value);
    }
    
  }
  async function handleClick() {
    if (!userId) {
      navigate('/login')
    }
    const data = {
      nights,
      price,
      userId,
      apartmentId: id,
      
    }
    //console.log(data)
    const response = await book(data);
     // console.log(response);
      if (response.success) {
        alert("Apartment Booked Successfuly");
        navigate(-1)
      }
    }
  function available(listing){
    
    if (listing.bookings.length>0){
      //console.log(Date.now()<Date.parse(listing.bookings[0].ends))
      return Date.now()>Date.parse(listing.bookings[0].ends)
      
    }
    return true
  }
  return (
    <>{!loading?
      <div className="reservation">
        
            <div className='title'>
            <div className='back-icone'><IoMdArrowRoundBack style={{'color':'red'}}onClick={()=>{navigate(-1)}}/></div>
                Morocco, {listing.address}
              
             
            </div>
            
        
        <div className="apartment-res">
          <div className="apartment-img" >
            <img src={listing.image} />
          </div>
          
          <div className='details'>
              <p> <b>Renter:</b> {listing.user.name}</p>
              <p><b>Number Of Rooms:</b> {listing.rooms}</p>
              <p><b>Phone Number:</b> {listing.user.phone}</p>
              <p><b>Availability Status:</b> {available(listing)?'Available': 'Not Available'}</p>
              <div className="book">
                <div className="nights">
                <label htmlFor="nights" ><b>Nights:</b> </label>
                <input type="number" id="nights" name="nights" value={nights} onChange={handleChange}/>
                </div>
                
                <p id='price'>{price} MAD</p>
              </div>
              
              <button className={!available(listing)?'reserve-btn not-available-btn':'available-btn'} onClick={handleClick} disabled={available(listing)?false:true}>Reserve</button>
          </div>
        </div>
        
       
      </div>
    :
    <div></div>
    }
    </>
    
  )
}

export default Reservation