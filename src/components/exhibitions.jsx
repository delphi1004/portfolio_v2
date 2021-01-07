import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentSubMenu } from '../reducer/statusReducer'
import { global } from '../data/global'
import { Data_ExhibitionSubMenu } from '../data/global'
import './exhibitions.css'
import WorksCard from './worksCard/worksCard'

const Exhibition = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentSubMenu(global.menu.idle))
  }, [])

  //console.log(Data_ExhibitionSubMenu)

  return (
    <div id='exhibitionContainer'>
      <div id='exhibitionMenuContainer'>
        {Data_ExhibitionSubMenu.contents.map((info, index) => (
          <WorksCard key={index} index={index} info={info} />
        ))}
      </div>
    </div >
  )
}

export default Exhibition