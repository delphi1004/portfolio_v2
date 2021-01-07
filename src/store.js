import { createStore, combineReducers, applyMiddleware , compose  , } from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import statusReducer from './reducer/statusReducer'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const composeEnhancers =  compose

const reducer = combineReducers({
  systemStatus:statusReducer
})

const Store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default Store