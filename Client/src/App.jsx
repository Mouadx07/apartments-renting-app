import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import Root from './pages/root/Root'
import  Apartments from './pages/apartments/Apartments';
import SavedList from './pages/saved_list/SavedList';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile'
import CreateListing from './pages/create_listing/CreateListing';
import Signup from './pages/login_signup/Signup';
import Login from './pages/login_signup/Login';
import Reservation from './pages/reservation/Reservation';
import ProtectedRoute from './utils/ProtectedRoute';
import EditListing from './pages/create_listing/EditListing';
function App() {
  

  return (
    <Router>
        <Routes>
          <Route element={<Root/>}>
            <Route path="/" element={<Home />} />
            <Route path="apartments" element={<Apartments/>} />
            <Route path="savedlist" element={<SavedList />} />
            <Route path="signup" element={<Signup/>} />
            <Route path="login" element={<Login/>} />
             <Route path="" element={<ProtectedRoute/>} >
              <Route path="profile" element={<Profile />} />
              <Route path="profile/create-listing" element={<CreateListing/>} />
              <Route path="profile/edit-listing/:id" element={<EditListing/>} />

             </Route>
            
            <Route path="apartment/:id" element={<Reservation />} />
            
            
          </Route>
        </Routes>
      </Router>
    
  )
}

export default App
