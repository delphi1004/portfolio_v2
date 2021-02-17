import './App.css'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Header from './components/header/header'
import HomeP5 from './components/home/homeP5'
import About from './components/about/about'
import Works from './components/worksCard/works'
import Exhibition from './components/exhibitions/exhibitions'
import Contact from './components/contact/contact'
import ProjectBase from './components/project/projectBase'
import FullScreenProjectViewer from './components/project/fullScreenProjectViewer'
require('../public/favicon.ico')

const RouterViewer = () => {
  const location = useLocation()
  return (
    <TransitionGroup>
      <CSSTransition classNames='views' key={location.key} timeout={1500}>
        <Switch location={location}>
          <Route exact path='/' component={HomeP5}></Route>
          <Route exact path='/about' component={About}></Route>
          <Route exact path='/works' component={Works}></Route>
          <Route exact path='/exhibition' component={Exhibition}></Route>
          <Route exact path='/contact' component={Contact}></Route>
          <Route exact path='/works/generativeart' component={ProjectBase}></Route>
          <Route exact path='/works/interactiveart' component={ProjectBase}></Route>
          <Route exact path='/works/modeling' component={ProjectBase}></Route>
          <Route exact path='/works/software' component={ProjectBase}></Route>
          <Route exact path='/exhibition/whenlightechoes' component={ProjectBase}></Route>
          <Route exact path='/exhibition/seeingmusic' component={ProjectBase}></Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

function App() {
  const showFullScreenGallery = useSelector(state => state.systemStatus.showFullScreenGallery)
  const galleryInfo = useSelector(state => state.systemStatus.fullScreenGalleryInfo)

  return (
    <div className="App">
      {showFullScreenGallery &&
        <FullScreenProjectViewer info={galleryInfo.info} initialPageNo={galleryInfo.initialPageNo} />
      }
      <Router>
        <Header />
        <RouterViewer />
      </Router>
    </div>
  )
}

export default App

