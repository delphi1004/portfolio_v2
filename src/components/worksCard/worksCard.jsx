import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setCurrentSubMenu } from '../../reducer/statusReducer'
import './worksCard.css'
import { global } from '../../data/global'

const WorksCard = ({ index, info }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const delay = `${index / 3}s`
  const number = (index + 1).toString().padStart(2, 0)

  const clickHandler = (id) => {
    //console.log('clicked id ', id)
    dispatch(setCurrentSubMenu(id))

    switch (id) {
      case global.worksMenu.generativeArt: history.push('/works/generativeart'); break
      case global.worksMenu.interactiveArt: history.push('/works/interactiveart'); break
      case global.worksMenu.modeling: history.push('/works/modeling'); break
      case global.worksMenu.software: history.push('/works/software'); break
      case global.exhibitionMenu.whenlightEchoes: history.push('/exhibition/whenlightechoes'); break
      case global.exhibitionMenu.seeingSound: history.push('/exhibition/seeingmusic'); break
    }
  }

  return (
    <div id='worksCard' style={{ '--backgroundColor': info.backgroundColor, '--delay': delay }} onClick={() => clickHandler(info.id)}>
      <img id='thumbnailImage' src={info.titleImage.default} alt='image' />
      <p id='works-title'>{info.title}</p>
      <p id='works-separator'></p>
      <p id='works-description'>{info.description}</p>
      <p id='works-number'>{number}</p>
      <p id='works-vertical-separator'></p>
      <div id='works-extraDescription-container'>
        <p id='works-extraDescription'>{info.extraDescription} </p>
      </div>
    </div>
  )
}

export default WorksCard