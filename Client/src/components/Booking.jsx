import React from 'react'
import './Booking.css'
const Booking = ({nights, start, end, img, price, address}) => {
  return (
    <div className="booking-card">
        <img src={img} alt="image of apartment booked" />
        <div className='booking-details'>
            <div>
                <p className="detail-title">Address:</p>
                <p>{address}</p>
            </div> 
            <div>
                <p className="detail-title">Booked at:</p>
                <p>{start}</p>
            </div>        
            <div>
                <p className="detail-title">Booking ends at:</p>
                <p>{end}</p>
            </div>
            <div>
                <p className="detail-title">Price:</p>
                <p>{nights?price*nights:price} MAD</p>
            </div>
        </div>
        
        
        
    </div>
  )
}

export default Booking;