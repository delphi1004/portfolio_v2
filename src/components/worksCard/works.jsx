import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentSubMenu } from '../../reducer/statusReducer'
import { global, Data_WorksSubMenu } from '../../data/global'
import './works.css'
import WorksCard from './worksCard'

const Works = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentSubMenu(global.menu.idle))
  }, [])

  return (
    <div id='worksContainer'>
      <div id='workMenuContainer'>
        {Data_WorksSubMenu.contents.map((info, index) => (
          <WorksCard key={index} index={index} info={info} />
        ))}
      </div>
    </div >
  )
}

export default Works