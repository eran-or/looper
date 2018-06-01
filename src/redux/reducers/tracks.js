import { handleActions } from 'redux-actions'
import {setTracks, setTracklist, togglePlayAll} from '../actions/tracks'

const defaultState = {};
export default handleActions({
  [setTracks]: (state, { payload: {tracks} }) => Object.assign({},state,{tracks}),
  [setTracklist]: (state, { payload: {tracklist} }) => Object.assign({},state,{tracklist}),
  [togglePlayAll]: (state, { payload: {playAll} }) => Object.assign({},state,{playAll})
}, defaultState);