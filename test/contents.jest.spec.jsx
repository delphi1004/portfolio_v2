import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Home from '../src/components/home/home'
import Header from '../src/components/header/header'
import ProjectContainer from '../src/components/project/projectContainer'
import { Data_Generative } from '../src/data/global'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore(null)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('check the contents', () => {

  afterEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('renders title', () => {
    const component = render(
      <Home />
    )
    expect(component.container).toHaveTextContent(
      'John Lee'
    )
  })

  it('renders menu', () => {
    const component = render(
      <Router>
        <Provider store={store}><Header /></Provider>
      </Router>
    )
    expect(component.container).toHaveTextContent('about')
    expect(component.container).toHaveTextContent('work')
    expect(component.container).toHaveTextContent('exhibition')
    expect(component.container).toHaveTextContent('contact')
  })

  it('project viewer', async () => {
    const testViewData = {
      data: Data_Generative, title: 'Generative Art', background: '#bf8726'
    }

    const component = render(
      <Router>
        <Provider store={store}>
          <ProjectContainer info={testViewData} />
        </Provider>
      </Router>
    )

    await act(() => sleep(2000))

    expect(component.container).toHaveTextContent('The sound is the one of most sensory information')
    expect(component.container).toHaveTextContent('a shape of name')
    expect(component.container).toHaveTextContent('a beauty of randomness')
    expect(component.container).toHaveTextContent('Music and visual artwork are a valuable part of our daily life')
  })
})