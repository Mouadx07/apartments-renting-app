import React from 'react'
import './Listing.css'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import {deleteApartment} from '/src/utils/api'


function Listing({img, renter, price, address, available, onClick, id=false, onDelete={}}){
  console.log(available)
  const navigate = useNavigate();
  function handleDeleteClick(){
 
    deleteApartment(id).then(data=>{
      if( data.success ){
        onDelete(id);
      }
    })

  }
  function handleEdit(e){
    
    navigate(`edit-listing/${id}`);
  }
  
  return (
    <div className={!id?'listing':'listing profile-listing'} onClick={onClick}>
        <img src={img} />
        
          <div className='listing-info'>
              <h3 className='listing-title'>{address}</h3>
              <div className='listing-desc'>
                  <p id="renter">Owner: {renter}</p>
                  <p>{available}</p>
              </div>
              
                <p id="price">{price} MAD</p>
                
              
              
          </div>
          {id &&
          (<div className="edit-delete" >
            <FiEdit onClick={handleEdit} />
            <RiDeleteBin6Fill style={{'color':'red'}} onClick={handleDeleteClick}/>
          </div>)}
          
        </div>
        
   
  )
}

export default Listing