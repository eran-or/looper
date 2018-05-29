import { handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'
import {setTracks, setSelectValues} from '../actions/tracks'

const defaultState = Immutable({});
export default handleActions({
  [setTracks]: (state, { payload: {tracks} }) => state.set("tracks",tracks),
  [setSelectValues]: (state, { payload: {values} }) => state.set("selectValues",values)
}, defaultState);