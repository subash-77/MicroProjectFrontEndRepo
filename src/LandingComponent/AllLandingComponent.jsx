import React from 'react'
import Header from './Header/Header'
import Hero from './Hero/Hero'
import '../App.css';
import Residencies from './Residencies/Residencies';
import GetStrated from './GetStrated/GetStrated';
import Footer from './Footer/Footer';

const AllLandingComponent = () => {
  return (
    <div className="App">
    <div>
      <div className="white-gradient" />
      <Header />
      <Hero />
    </div>
    <Residencies />
    <GetStrated/>
    <Footer/>
    
  </div>
  )
}

export default AllLandingComponent
