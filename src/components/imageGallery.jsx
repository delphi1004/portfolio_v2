import './imageGallery.css'
import { useDispatch } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { setShowFullScreenGallery } from '../reducer/statusReducer'

const ImageGallery = ({ info, showOriginalSize, startAnimation, fullScreenHandler = null, initialPageNo = 0 }) => {
  const dispatch = useDispatch()
  const scale = showOriginalSize ? info.fullScreenScale : 1
  const gellaryHeight = { width: `${info.width * scale}vw`, height: `${info.width * scale * info.aspecRatio}vw` }
  const resourceLength = info.contentsImage.length
  const myRef = useRef(undefined)
  const [indicatorWidth, setIndicatorWidth] = useState(0)
  const [pageNo, setPageNo] = useState(initialPageNo)
  const [indicatorPos, setIndicatorPos] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (myRef.current) {
        setIndicatorWidth(Math.round(myRef.current.offsetWidth / resourceLength))
        myRef.current.scrollTo(0, 0)
        setIndicatorPos(0)
        setPageNo(0)
      }
    }

    if (myRef.current) {
      window.addEventListener('resize', handleResize)
      setIndicatorWidth(Math.round(myRef.current.offsetWidth / resourceLength))
      setIndicatorPos(pageNo * Math.round(myRef.current.offsetWidth / resourceLength))
      myRef.current.scrollTo(pageNo * myRef.current.offsetWidth, 0)
    }

    return function cleanup() {
      dispatch(setShowFullScreenGallery(false))
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onNexthandler = () => {
    slideImage(pageNo + 1)
  }

  const onPrevhandler = () => {
    slideImage(pageNo - 1)
  }

  const slideImage = (newPageNo) => {

    if (newPageNo < 0 || newPageNo >= resourceLength) {
      newPageNo = 0
    }

    if (newPageNo >= 0 && newPageNo <= resourceLength) {
      myRef.current.scrollTo(newPageNo * myRef.current.offsetWidth, 0)
      setIndicatorPos(newPageNo * indicatorWidth)
    }
    setPageNo(newPageNo)
  }

  const SelectResource = (resource, index) => {
    if (resource.includes('JPG') || resource.includes('jpg') || resource.includes('png')) {
      return ShowImage(resource, index)
    }

    if (resource.includes('youtube')) {
      return ShowVideo(resource, index)
    }
    return null
  }

  const ShowImage = (image, index) => {
    let resource

    if (showOriginalSize) {
      resource = require(`../data/images/originalSize/${image}`)
    } else {
      resource = require(`../data/images/middleSize/${image}`)
    }

    return (
      <img key={index} src={resource.default} alt='' width='100%' height='100%' />
    )
  }

  const ShowVideo = (video, index) => {
    return (
      <iframe key={index} id='image1' style={{ width: '100%', height: '100%' }} src={video}
        frameBorder='0'
        allow='encrypted-media'
        allowFullScreen='allowFullScreen'
        title='video'
      />
    )
  }

  const clickHandler = () => {
    if (!showOriginalSize) {
      fullScreenHandler(pageNo)
    }
  }

  return (
    <div className={startAnimation ? 'gallery-container gallery-active' : 'gallery-container'} style={gellaryHeight}>
      {(indicatorWidth > 0 && info.contentsImage.length > 1) &&
        <div id='indicator' style={{ width: `${indicatorWidth}px`, left: indicatorPos }}></div>
      }
      {info.contentsImage.length > 1 && <ArrowBackIosIcon id='scroll-prev' onClick={onPrevhandler} />}
      {info.contentsImage.length > 1 && <ArrowForwardIosIcon id='scroll-next' onClick={onNexthandler} />}
      {/* {info.contentsImage.length > 1 && <p id='scroll-prev' onClick={onPrevhandler}>-</p>}
      {info.contentsImage.length > 1 && <p id='scroll-next' onClick={onNexthandler}>+</p>} */}

      <div id='gallery' ref={myRef} onClick={() => clickHandler()}>
        {info.contentsImage.map((resource, index) => SelectResource(resource, index))}
      </div>
    </div >
  )
}


export default ImageGallery
