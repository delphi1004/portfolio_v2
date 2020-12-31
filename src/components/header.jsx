import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentMenu } from '../reducer/statusReducer'
import { global } from '../data/global'
import './header.css'

const Header = () => {
  const dispatch = useDispatch()

  const menuClicked = (id) => {
    console.log('menu clicked ', id)
    dispatch(setCurrentMenu(id))
  }

  return (
    <div id='header'>
      <div id='mainMenu'>
        <NavLink exact to='/about' activeClassName={'active'} onClick={() => { menuClicked(global.menu.about) }}>about</NavLink>
        <NavLink to='/works' activeClassName={'active'} onClick={() => { menuClicked(global.menu.works) }}>works</NavLink>
        <NavLink to='/exhibition' activeClassName={'active'} onClick={() => { menuClicked(global.menu.exhibition) }}>exhibition</NavLink>
        {/* <NavLink exact to='/cv' activeClassName={'active'}>cv</NavLink> */}
        <NavLink exact to='/contact' activeClassName={'active'} onClick={() => { menuClicked(global.menu.contact) }}>contact</NavLink>
      </div>
    </div >
  )
}

export default Header