import React from 'react'
import './title.css'
import Curtain from './curtain'

const Title = () => {
  return (
    <div id='titleContainer'>
      <Curtain />
      <div style={{ marginTop: '20vh' }}></div>
      <p className='title'>I am</p>
      <p className='title-second' style={{ marginBottom: '40px' }}>John Lee</p>
      <div style={{ marginTop: '4vh' }}></div>
      <p className='description'>a Creative</p>
      <p className='description'>technologist</p>
      <p className='description'>New media</p>
      <p className='description'>artist.</p>
    </div>
  )
}

export default Title