import { handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'
import {setTracks} from '../actions/tracks'

const defaultState = Immutable({});
export default handleActions({
  //[setRestaurants]: (state, { payload: {restaurants} }) => state.merge({...restaurants})
  [setTracks]: (state, { payload: {tracks} }) => state.set("tracks",tracks)
  
}, defaultState);