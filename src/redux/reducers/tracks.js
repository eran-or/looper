import { handleActions } from 'redux-actions'
import {setTracks, setAudioRef, togglePlayingAll, eventStatus} from '../actions/tracks'

const defaultState = {};
export default handleActions({
  [setTracks]: (state, { payload: {tracks} }) => Object.assign({},state,{tracks}),
  [setAudioRef]: (state, { payload: {refMap} }) => Object.assign({},state,{audioRefs:refMap}),
  [togglePlayingAll]: (state, { payload: {toggle} }) =>  Object.assign({},state,{isPlayingAll:toggle}),
  [eventStatus]: (state, { payload: {status} }) => Object.assign({},state,{status})
}, defaultState);