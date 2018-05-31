
import { createActions } from 'redux-actions'

export const { setTracks, setPlayRef, setAudioRef, togglePlayingAll, eventStatus } = createActions({
  'SET_TRACKS': tracks => ({ tracks }),
  'SET_AUDIO_REF': refMap => ({refMap}),
  'TOGGLE_PLAYING_ALL': (toggle=false) => ({toggle}),
  'EVENT_STATUS': (status) => ({status})
})
