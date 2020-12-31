import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentSubMenu } from '../reducer/statusReducer'
import { global } from '../data/global'
import { Data_WorksSubMenu } from '../data/global'
import './works.css'
import WorksCard from './worksCard/worksCard'

const Works = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentSubMenu(global.menu.idle))
  }, [])

  return (
    <div id='worksContainer'>
      <div id='workMenuContainer'>
        <h1>hello world</h1>
        {Data_WorksSubMenu.contents.map((info, index) => (
          <WorksCard key={index} index={index} info={info} />
        ))}
      </div>
    </div >
  )
}

export default Works