import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import Title from '../src/components/title'
import Header from '../src/components/header'
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
      <Title />
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

    component.debug()

    expect(component.container).toHaveTextContent('The sound is the one of most sensory information')
  })
})