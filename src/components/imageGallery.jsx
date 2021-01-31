import './imageGallery.css'
import { useDispatch } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { setShowFullScreenGallery } from '../reducer/statusReducer'



const ImageGallery = ({ info, showOriginalSize, startAnimation, fullScreenHandler = null, initialPageNo = 0 }) => {
  const navigationButtonScale = 2.3
  const dispatch = useDispatch()
  const scale = showOriginalSize ? info.fullScreenScale : 1
  let gellarySize = { width: `${info.width * scale}vw`, height: `${info.width * scale * info.aspecRatio}vw` }
  let prevButtonPosition = { transform: `translateX(${info.width * scale / navigationButtonScale * -1}vw)` }
  let nextButtonPosition = { transform: `translateX(${info.width * scale / (navigationButtonScale + 0.07)}vw)` }
  const resourceLength = info.contentsImage.length
  const myRef = useRef(undefined)
  const smallScreenScale = 2
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
    if (!showOriginalSize && window.innerWidth > 1300) {
      fullScreenHandler(pageNo)
    }
  }

  if (window.innerWidth > 1300) {
    gellarySize = { width: `${info.width * scale}vw`, height: `${info.width * scale * info.aspecRatio}vw` }
    prevButtonPosition = { transform: `translateX(${info.width * scale / navigationButtonScale * -1}vw)` }
    nextButtonPosition = { transform: `translateX(${info.width * scale / (navigationButtonScale - 0.07)}vw)` }
  } else {
    gellarySize = { width: `${info.width * smallScreenScale * scale}vw`, height: `${info.width * smallScreenScale * scale * info.aspecRatio}vw` }
    prevButtonPosition = { transform: `translateX(${info.width * scale * smallScreenScale / navigationButtonScale * -1}vw)` }
    nextButtonPosition = { transform: `translateX(${info.width * scale * smallScreenScale / (navigationButtonScale - 0.07)}vw)` }
  }

  return (
    <div className={startAnimation ? 'gallery-container gallery-active' : 'gallery-container'} style={gellarySize}>
      {(indicatorWidth > 0 && info.contentsImage.length > 1) &&
        <div id='indicator' style={{ width: `${indicatorWidth}px`, left: indicatorPos }}></div>
      }
      {info.contentsImage.length > 1 && <ArrowBackIosIcon id='scroll-prev' style={prevButtonPosition} onClick={onPrevhandler} />}
      {info.contentsImage.length > 1 && <ArrowForwardIosIcon id='scroll-next' style={nextButtonPosition} onClick={onNexthandler} />}
      <div id='gallery' ref={myRef} onClick={() => clickHandler()}>
        {info.contentsImage.map((resource, index) => SelectResource(resource, index))}
      </div>
    </div >
  )
}


export default ImageGallery
