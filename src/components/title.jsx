import React from 'react'
import './title.css'
import Curtain from './curtain'

const Title = () => {
  const title = 'I am John Lee'
  return (
    <div id='titleContainer'>
      <Curtain />
      <p className='title'>{title}</p>
      <p className='description'>a Creative technologist</p>
      <p className='description'>New media artist.</p>
    </div>
  )
}

export default Title