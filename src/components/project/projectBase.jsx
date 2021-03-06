import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './projectBase.css'
import { Data_Exhibition_WhenLightEchoes, Data_Exhibition_SeeingMusic, Data_Generative, Data_Interactive, Data_Modeling, Data_Software } from '../../data/global'
import ProjectContainer from './projectContainer'

let currentViewData
const viewData = []
viewData['generativeart'] = {
  data: Data_Generative, title: 'Generative Art', background: '#bf8726'
}
viewData['interactiveart'] = {
  data: Data_Interactive, title: 'Interactive Art', background: '#bfa126'
}
viewData['modeling'] = {
  data: Data_Modeling, title: '3D Modeling', background: '#bfba26'
}
viewData['software'] = {
  data: Data_Software, title: 'Software development', background: '#abbf26'
}

viewData['whenlightechoes'] = {
  data: Data_Exhibition_WhenLightEchoes, title: 'Exhibition', background: '#bf8726'
}

viewData['seeingmusic'] = {
  data: Data_Exhibition_SeeingMusic, title: 'Exhibition', background: '#bfa126'
}

const ProjectBase = () => {
  const [backgroundColor, setBackgroundColor] = useState()
  const { project } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    currentViewData = viewData[project]
    setBackgroundColor(currentViewData.background)
  }, [])

  if (!currentViewData) {
    return null
  }

  return (
    <div className='project-base' style={{ backgroundColor: backgroundColor }} >
      <ProjectContainer info={currentViewData} />
    </div >
  )
}

export default ProjectBase