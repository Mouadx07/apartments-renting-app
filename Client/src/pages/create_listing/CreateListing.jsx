import React from 'react'
import { useState, useContext, useRef } from 'react';
import './CreateListing.css'
import { MdAddPhotoAlternate } from "react-icons/md";
import { AuthContext } from '../../context/AuthContext';
import { listApartment } from '../../utils/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateListing = () => {
  const cities = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Fes",
    "Tangier",
    "Agadir",
    "Meknes",
    "Oujda",
    "Taza",
    "Temara",
    "Salé",
    "Kenitra",
    "El Jadida",
    "Tetouan",
    "Nador",
    "Safi",
    "Beni Mellal",
    "Khemisset",
    "Errachidia",
    "Settat",
    "Laayoune",
    "Dakhla",
    "Asfi",
    "Ifrane",
    "Sidi Kacem",
    "Tiflet",
    "Al Hoceima",
    "M'Semrir",
    "Ouarzazate",
    "Azrou",
    "Khouribga",
    "Ksar el-Kebir",
    "Sidi Ifni"
  ];
  const [image, setImage] = useState(null);
  const [imageView, setImageView] = useState(null)
  const [listingData, setlistingData] = useState({address: '', rooms: '', price:''})
  const [errorMsg, setErrorMsg] = useState("")
  const {userId} = useContext(AuthContext);
  const {imgInputRef} = useRef();
  const navigate = useNavigate()
  function handleImgChange(e) {
    const file = e.target.files[0];
    setImage(file) // Get the uploaded file
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        //console.log(reader.result)
        setImageView(reader.result); 
      };
      reader.readAsDataURL(file)
      
    }
    setErrorMsg("")
  }
  function handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    setlistingData((d)=>{
      return {...d, [name]:value}
    })
  }
  async function handleSubmit(e){
    e.preventDefault()
    const data = {...listingData, image, user_id:userId}
    console.log(data)
    const formData = new FormData();
    formData.append('address', data.address);
    formData.append('price', data.price);
    formData.append('rooms', data.rooms);
    formData.append('user_id', userId);
    formData.append('image', image);
    const response = await listApartment(formData)
    if (!response){
      setErrorMsg('Please Choose an Image for your Apartment!')
    }
    else{
      navigate('/profile')
    }
    //console.log(response)
  }
  return (
    <div >
      <h1>Add new listing!</h1>

      <form action="" className="listing-form" onSubmit={handleSubmit}>
        {<input ref={imgInputRef} id="file-upload" type="file" accept='image' name="image" onChange={handleImgChange}/>}
        {!image ? (
          <div className='box upload' id="img-upload" onClick={() => document.getElementById('file-upload').click()}>
            
            <div className="upload-text">
              <MdAddPhotoAlternate size='1.5em' className='upload-icon'/> 
            </div>
          </div>
        ) : (
          <div className="uploaded-image" onClick={() => document.getElementById('file-upload').click()}>
            <img src={imageView} alt="Uploaded" />
          </div>
        )}
        
        <label htmlFor="city-select">Choose a city:</label>
        <select name="address" value={listingData.address.value} onChange={handleChange} id="city-select" required>
          <option value="">Please choose an option--</option>
          {cities.map((city, i)=><option key={i} value={city}>{city}</option>)}
        </select>
       
        <label htmlFor="rooms">Number of Rooms: </label>
        <input type="number" name="rooms" value={listingData.rooms.value} onChange={handleChange} required/>
        <label htmlFor="price">Price: </label>
        <input type="number" name="price"  value={listingData.price.value} onChange={handleChange} required/>
        <input type="submit" id="create-btn" value="Create" />
        <div className="erroMsg">
          <p style={{'color':'#740938'}}>{errorMsg}</p>
        </div>
      </form>

    </div>
  )
}

export default CreateListing