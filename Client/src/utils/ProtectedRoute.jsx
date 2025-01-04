import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { AuthContext } from '/src/context/AuthContext';
import { useNavigate } from "react-router";
import { useContext } from 'react';

const ProtectedRoute = ({children}) => {
    const { token, logout } = useContext(AuthContext);
    let navigate = useNavigate();
    useEffect(()=>{
        //console.log(children)
        if (!token){
            navigate('/login')
        }
    }, [])
    return (
        <>
        {token?<Outlet/>:navigate('/login')}
        </>
        
    )
}

export default ProtectedRoute