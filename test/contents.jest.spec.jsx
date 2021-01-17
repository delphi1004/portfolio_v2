import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import Title from '../src/components/title'
import Header from '../src/components/header'

describe('check the contents', () => {
  test('renders title', () => {
    const component = render(
      <Title />
    )
    expect(component.container).toHaveTextContent(
      'John Lee'
    )
  })

  test('renders menu', () => {
    const mockStore = configureStore()
    let store

    store = mockStore(null)
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
})