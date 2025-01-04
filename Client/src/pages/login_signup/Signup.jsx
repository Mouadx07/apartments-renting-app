import React, { useState, useContext } from 'react';
import './LoginSignup.css'
import user_icon from '/src/assets/person.png'
import email_icon from '/src/assets/email.png'
import password_icon from '/src/assets/password.png'
import { AuthContext } from '/src/context/AuthContext';
import { logInApi, signUpApi } from '../../utils/api';
import { useNavigate } from "react-router";
function Signup() {

    const [name, setName]  = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('')
    const {login} = useContext(AuthContext)
    let navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        //console.log(email, password)
        const data = await signUpApi(name, email, phone, password)
        //console.log(data.success)
        if (data.success) {
            login(data.token, data.user_id)
            navigate('/')
        }
        else {
            console.log('error login in...')
        }
    }
    return (
      <div className='container'>
          <div className="header">
              <div className="text">Sign Up</div>
              <div className="underline"></div>
          </div>
          <div className="inputs">
              {<div className="input">
                  <img src={user_icon} alt="" />
                  <input type="text" placeholder="Enter Name" value={name} required onChange={(e)=> {setName(e.target.value)}}/>
              </div>}
             
              <div className="input">
                  <img src={email_icon} alt="" />
                  <input type="email" placeholder="Enter E-mail" value={email} required onChange={(e)=> {setEmail(e.target.value)}}/>
            
              </div>
              <div className="input">
                  <img src={email_icon} alt="" />
                  <input type="text" placeholder="Enter Phone Number" value={phone} required onChange={(e)=> {setPhone(e.target.value)}}/>
            
              </div>
              <div className="input">
                  <img src={password_icon} alt="" />
                  <input type="password" placeholder="Enter Password" value={password} required onChange={(e)=> {setPassword(e.target.value)}}/>
              </div>
          </div>
          
          
          <div className="submit-container">
              <input type="submit" value="Sign Up" className={"submit"} onClick={handleSubmit} />
              
          
          </div>
      </div>
    );
  }

export default Signup;
