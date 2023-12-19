import React from 'react'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'

function App() {
  return (<Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/listing/:listingId" element={<Listing />} />
      <Route element = {<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-listing" element={<CreateListing />} />
      <Route path="/edit-listing/:listingId" element={<EditListing />} />

      </Route>
      
      
    </Routes>
  </Router>
  )
 

  
}

export default App