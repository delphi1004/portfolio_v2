import './App.css'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Header from './components/header/header'

require('../public/favicon.ico')

const HomeP5 = lazy(() => import('./components/home/homeP5'))
const About = lazy(() => import('./components/about/about'))
const Works = lazy(() => import('./components/worksCard/works'))
const Exhibition = lazy(() => import('./components/exhibitions/exhibitions'))
const Contact = lazy(() => import('./components/contact/contact'))
const ProjectBase = lazy(() => import('./components/project/projectBase'))
const FullScreenProjectViewer = lazy(() => import('./components/project/fullScreenProjectViewer'))

const RouterViewer = () => {
  const location = useLocation()

  return (
    <TransitionGroup>
      <CSSTransition classNames='views' key={location.key} timeout={1500}>
        <Switch location={location}>
          {/* <Route exact path='/' component={widhSuspense(HomeP5)}></Route>
          <Route exact path='/about' component={widhSuspense(About)}></Route>
          <Route exact path='/works' component={widhSuspense(Works)}></Route>
          <Route exact path='/exhibition' component={widhSuspense(Exhibition)}></Route>
          <Route exact path='/contact' component={widhSuspense(Contact)}></Route>
          <Route exact path='/works/:project' component={widhSuspense(ProjectBase)}></Route>
          <Route exact path='/exhibition/:project' component={widhSuspense(ProjectBase)}></Route> */}
          <Suspense fallback={null}>
            <Route exact path='/' component={HomeP5}></Route>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/works' component={Works}></Route>
            <Route exact path='/exhibition' component={Exhibition}></Route>
            <Route exact path='/contact' component={Contact}></Route>
            <Route exact path='/works/:project' component={ProjectBase}></Route>
            <Route exact path='/exhibition/:project' component={ProjectBase}></Route>
          </Suspense>
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

