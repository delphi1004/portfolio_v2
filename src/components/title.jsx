import React from 'react'
import './title.css'
import Curtain from './curtain'

const Title = () => {
  // const title = 'I am John Lee'
  return (
    <div id='titleContainer'>
      <Curtain />
      <div style={{ marginTop: '20vh' }}></div>
      <p className='title'>I am John</p>
      <p className='title'>Lee</p>
      <div style={{ marginTop: '5vh' }}></div>
      <p className='description'>a Creative</p>
      <p className='description'>technologist</p>
      <p className='description'>New media</p>
      <p className='description'>artist.</p>
    </div>
  )
}

export default Title