// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { setCurrentSubMenu } from '../reducer/statusReducer'
// import { global } from '../data/global'
// import './about.css'

// const About = () => {
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(setCurrentSubMenu(global.menu.idle))
//   }, [])

//   return (
//     <div id='aboutContainer'>
//       <div id='aboutMenuContainer'>
//         <div id='aboutCard'>
//           <p id='about-name'>John Lee</p>
//           <p id='about-title'>Creative technologist, New media Artist</p>
//           <p id='about-separator' />
//           <p id='about-description'>with mobile dev and media art experience, wanting to focus on my skills more on creative projects. I have over a decade of professional programming experience (C#, C++, C, Objective-C). I have experienced with Unity3D and computer graphics(shader coding, OpenGL, graphics pipeline). I have also made interactive art installations and released a mobile app on iOS. I want to combine all of those skills to help make a great creative project. I am looking for creative projects and want to work with passionate people.</p>
//         </div>
//       </div>
//     </div >
//   )
// }

// export default About

import React from 'react'
import './about.css'

// const About = () => {

//   return (
//     <div id='aboutContainer'>
//       <h1 id='aboutTitle'>I am a Creative technologist, New media artist</h1>
//       <div id='aboutDescription'>
//         <p >
//           with mobile dev and media art experience, wanting to focus on my skills more on creative projects. I have over a decade of professional programming experience (C#, C++, C, Objective-C). I have experienced with Unity3D and computer graphics(shader coding, OpenGL, graphics pipeline). I have also made interactive art installations and released a mobile app on iOS. I want to combine all of those skills to help make a great creative project. I am looking for creative projects and want to work with passionate people.
//         </p>
//       </div>
//     </div >
//   )
// }

const About = () => {
  const image = require('../data/images/originalSize/about.JPG')

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