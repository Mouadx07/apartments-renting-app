import React, { useState, useEffect, useRef, useContext  } from 'react';
import { Outlet } from 'react-router-dom';
import './Root.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Footer from './Footer';



const links = [
    {title: 'Home', path:'/'},
    {title: 'Apartments', path:'/apartments'},
]
function  Root() {
    const {userId, token, logout} = useContext(AuthContext)
    // useEffect(()=>{
    //     console.log(userId + ' user')
    //     console.log(token)
    // })
    
    return (
        <div className="app">
            <nav>
                
                <div className="pages">
                   {links.map((link, i)=> {
                    return <NavLink className={({isActive})=>isActive?"activeNav":"inactiveNav"} key={i} id={i} to={link.path}>{link.title}</NavLink>
                   })}
                    
                </div>
                
                {token?<div className='auth'>
                        <NavLink className={({isActive})=>isActive?"activeNav":"inactiveNav"} id='profile' to="profile">Profile</NavLink>
                        <Link className="auth-action" to="" onClick={()=>{logout()}}>Logout</Link>
                     </div>                    
                     :<div className='auth'>
                    <Link  to="login" className="auth-action" >Login</Link>
                     <Link to="signup" className="auth-action">SignUp</Link>
                    </div>
                }
                
                
            </nav>
            <main className="main-content">
                <Outlet/>
            </main>
            <Footer/>
            

      
        </div>
    )
}

export default Root;