import React, { useEffect,useState, useContext, useRef } from 'react'
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
    const [paymentOpened, setPaymentOpened] = useState(false)
    const paymentRef = useRef()
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

    async function handleClick() {
      
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
    
  function handleChange(e){
    if (e.target.value>=1){
      setNights(e.target.value);
    setPrice(listing.price*e.target.value);
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
              
              <button className={!available(listing)?'reserve-btn not-available-btn':'available-btn'} onClick={()=>{
                if (!userId){
                  navigate('/login');
                  return
                }
                setPaymentOpened(true);

              }} disabled={available(listing)?false:true}>Reserve</button>
          </div>
        </div>
        {paymentOpened&& 
        <div className="payment-modal-overlay" onClick={(e)=>{
          if(!paymentRef.current.contains(e.target))
          setPaymentOpened(false);
          }}>
          <div ref={paymentRef} className="payment-modal">
            <p className='confirm'>Confirm Payment</p>
            <div className="pay">
              <div className='payment-info'>
                <p>Price: <span className='payment-price'>{price} MAD</span> for {nights} Nights.</p>
                <div className='payment-icons'>
                  <img className="icon" src="/src/assets/paypal.png" title="visa icons" style={{ width: `25px`, height: `25px` }}/>
                  <img className="icon" src="/src/assets/visa.png" title="visa icons" style={{ width: `40px`, height: `40px` }} />
                  <img className="icon" src="/src/assets/apple-pay.png" title="visa icons" style={{ width: `50px`, height: `50px` }} />
                </div>
              </div>
              <button onClick={handleClick}>Accept</button>
            </div>
            
          </div>
        </div>}
       
      </div>
    :
    <div></div>
    }
    </>
    
  )
}

export default Reservation