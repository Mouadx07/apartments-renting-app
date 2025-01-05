import React, { useEffect, useState } from 'react';
import './Home.css';
import { getAllApartments } from '../../utils/api';
import Listing from '../../components/Listing';
import { Link } from 'react-router-dom';
const Home = () => {
  const [listings, setLisitngs] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    getAllApartments().then(data=>{setLisitngs(data.apartments.slice(0, 3))});
  }, [])
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Home Away From Home</h1>
          <p>Discover unique places to stay around in Morocco</p>
          <Link to="/apartments"> Discover Now </Link>

        </div>
      </section>

      <section className="featured-listings">
        <h2>Featured Listings</h2>
        <div className="listings-grid">
        {listings&&listings.map((listing, i)=><Listing key={i} img={listing.image} renter={listing.user.name} price={listing.price} available={''} address={listing.address}/>)}
        </div>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🏠</div>
            <h3>Verified Homes</h3>
            <p>All our listings are verified for quality and comfort</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Find the best deals for your perfect stay</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>Secure Booking</h3>
            <p>Safe and secure payment process</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
