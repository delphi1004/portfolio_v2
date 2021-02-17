import React from 'react'
import './home.css'
import Curtain from '../components/curtain/curtain'

const Home = () => {
  return (
    <div id='homeContainer'>
      <Curtain />
      <div style={{ marginTop: '20vh' }}></div>
      <p className='home'>I am</p>
      <p className='home-second' style={{ marginBottom: '40px' }}>John Lee</p>
      <div style={{ marginTop: '4vh' }}></div>
      <p className='description'>a Creative</p>
      <p className='description'>technologist</p>
      <p className='description'>New media</p>
      <p className='description'>artist.</p>
    </div>
  )
}

export default Home