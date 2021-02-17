import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentSubMenu } from '../../reducer/statusReducer'
import { global } from '../../data/global'
import './contact.css'
import { IconButton } from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import InstagramIcon from '@material-ui/icons/Instagram'

const Contact = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentSubMenu(global.menu.idle))
  }, [])

  return (
    <div id='contactContainer'>
      <div id='contactMenuContainer'>
        <div id='contactCard'>
          <p id='contact-name'>John Lee</p>
          <p id='contact-title'>Creative technologist, New media Artist</p>
          <p id='contact-separator' />
          <IconButton id='contact-email' color='default' aria-label='favorite' href={`mailto:${'delphi1004@hanmail.net'}`} target={'_blank'}>
            <MailOutlineIcon id='contact-email-icon' />
          </IconButton>
          <IconButton id='contact-linkedin' color='default' aria-label='favorite' href='https://www.linkedin.com/in/delphi1004/' target={'_blank'}>
            <LinkedInIcon id='contact-linkedin-icon' />
          </IconButton>
          <IconButton id='contact-github' color='default' aria-label='favorite' href='https://github.com/delphi1004' target={'_blank'}>
            <GitHubIcon id='contact-github-icon' />
          </IconButton>
          <IconButton id='contact-insta' color='default' aria-label='favorite' href='https://www.instagram.com/delphi1004' target={'_blank'}>
            <InstagramIcon id='contact-insta-icon' />
          </IconButton>
        </div>
      </div>
    </div >
  )
}

export default Contact