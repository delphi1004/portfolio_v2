import React, { useState, useEffect } from 'react'
import './fullScreenProjectViewer.css'
import { useDispatch } from 'react-redux'
import ImageGallery from '../imageGallery'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { setShowFullScreenGallery } from '../../reducer/statusReducer'

const FullScreenProjectViewer = ({ info, initialPageNo }) => {
  const dispatch = useDispatch()
  const [startClosing, setStartClosing] = useState(false)

  useEffect(() => {
    return () => {
      console.log('set full screen gallery false')
      dispatch(setShowFullScreenGallery(false))
    }
  }, [])

  const closeingHandler = () => {
    console.log('EXIT FULL SCREEN MODE')
    setStartClosing(true)
    setTimeout(() => {
      dispatch(setShowFullScreenGallery(false))
    }, 500)
  }

  console.log(info)
  return (
    <div className={!startClosing ? 'fullScreen-project-Viewer active-openning' : 'fullScreen-project-Viewer active-closing'} >
      <p id='works-catagory'>{info.title} </p>
      <ExitToAppIcon id='fullScreen-close' onClick={() => closeingHandler()} />
      <div id='fullScreen-container' >
        <ImageGallery info={info} showOriginalSize={true} startAnimation={true} initialPageNo={initialPageNo} />
      </div>

    </div >
  )
}

export default FullScreenProjectViewer