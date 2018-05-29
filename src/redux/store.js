
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import tracksReducer from './reducers/tracks'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  //Store cretion
  // const store = createStore(
  //   combineReducers({
  //     tracks: tracksReducer
  //   }),
  //   composeEnhancers(applyMiddleware(thunk,api,queue))
  // )

  const store = createStore(tracksReducer, composeEnhancers(applyMiddleware(thunk, apiMiddleware)))
    
  return store
}