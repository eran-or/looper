
import { createActions } from 'redux-actions'

export const { setTracks, setSelectValues } = createActions({
  'SET_TRACKS': tracks => ({ tracks }),
  'SET_SELECT_VALUES': values => ({ values })
})
