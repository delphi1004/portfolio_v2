/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import './styles/about.css'

const About = () => {
  const image = require('../../../public/images/originalSize/about.JPG')

  return (
    <div id='aboutContainer'>
      <div id='about-image-container'>
        <img id='about-image' src={image.default} alt='image' />
        <p className='about-image-description'>Lightning talks in VK19</p>
        <a className='about-image-description' href='https://vizknowledge.aalto.fi/archive/2019/' target='_blank'> https://vizknowledge.aalto.fi/archive/2019/</a>
        <p className='about-image-description'>Photo by Iiro Immonen</p>
      </div>
      <div id='about-description'>
        <p id='about-title'>JOHN LEE</p>
        <p id='about-sub-title'>A Creative technologist, New media artist</p>
        <p id='about-text'>I have over a decade of professional programming experience. I have also made interactive art installations and released a mobile app on iOS. I want to combine all of those skills to help make a great creative project. I am looking for creative projects and want to work with passionate people.</p>
      </div>
    </div >
  )
}

export default About