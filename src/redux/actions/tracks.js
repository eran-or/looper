
import { createActions } from 'redux-actions'

export const { setTracks, setTracklist, togglePlayAll } = createActions({
  'SET_TRACKS': tracks => ({ tracks }),
  'SET_TRACKLIST': (tracklist=[]) => ({tracklist}),
  'TOGGLE_PLAY_ALL': (playAll=false) => ({playAll})
})
