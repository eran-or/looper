import { handleActions } from 'redux-actions'
import {setTracks, setTracklist, togglePlayAll, toggleSync, setSynclist, setDurationMap} from '../actions/tracks'

const defaultState = {};
export default handleActions({
  [setTracks]: (state, { payload: {tracks} }) => Object.assign({},state,{tracks}),
  [setTracklist]: (state, { payload: {tracklist} }) => Object.assign({},state,{tracklist}),
  [setSynclist]: (state, { payload: {synclist} }) => Object.assign({},state,{synclist}),
  [setDurationMap]: (state, { payload: {durationMap} }) => Object.assign({},state,{durationMap}),
  [togglePlayAll]: (state, { payload: {playAll} }) => Object.assign({},state,{playAll}),
  [toggleSync]: (state, { payload: {sync} }) => Object.assign({},state,{sync})
}, defaultState);