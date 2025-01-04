import React, { useState, useContext } from 'react';
import './LoginSignup.css'
import user_icon from '/src/assets/person.png'
import email_icon from '/src/assets/email.png'
import password_icon from '/src/assets/password.png'
import { AuthContext } from '/src/context/AuthContext';
import { logInApi, signUpApi } from '../../utils/api';
import { useNavigate } from "react-router";

function Login() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const {login} = useContext(AuthContext)
    
    let navigate = useNavigate();


    async function handleSubmit(e){
        e.preventDefault();
        //console.log(email, password)
        const data = await logInApi(email.trim(), password.trim())
        console.log(data)
        if (data.success) {
            login(data.token, data.user_id)

            navigate('/')
        }
        else {
            console.log('error login in...')
            setErrorMsg(data)
        }

    }
    return (
      <div className='container'>
          <div className="header">
              <div className="text">Login</div>
              <div className="underline"></div>
          </div>
          <div className="inputs">
              
             
              <div className="input">
                  <img src={email_icon} alt="" />
                  <input type="email" value={email} placeholder="Enter E-mail" required onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
              <div className="input">
                  <img src={password_icon} alt="" />
                  <input type="password" value={password} placeholder="Enter Password" required onChange={(e)=>{setPassword(e.target.value)}} />
              </div>
          </div>
          <div className="error-msg">{errorMsg}</div>
          
          <div className="submit-container">
              <input type="submit" value="Login" className={"submit"} onClick={handleSubmit} />
              
          </div>
      </div>
    );
  }

export default Login;
