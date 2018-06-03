
import { createActions } from 'redux-actions'

export const { setTracks, setTracklist, togglePlayAll, toggleSync, setSynclist, setDurationMap } = createActions({
  'SET_TRACKS': tracks => ({ tracks }),
  'SET_TRACKLIST': (tracklist=[]) => ({tracklist}),
  'SET_DURATION_MAP': (durationMap) => ({durationMap}),
  'SET_SYNCLIST': (synclist=[]) => ({synclist}),
  'TOGGLE_PLAY_ALL': (playAll=false) => ({playAll}),
  'TOGGLE_SYNC': (sync=false) => ({sync})
})
