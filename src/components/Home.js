import React, { Component } from 'react'
import Playlist from './Playlist'
import ActionsBar from './ActionsBar'
import SelectTrack from './SelectTrack'
import { setTracklist, togglePlayAll } from '../redux/actions/tracks'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

HTMLAudioElement.prototype.stop = function()
{
    this.pause();
    this.currentTime = 0.0;
}
class Home extends Component {

  handleSelect = (selected) => {
    const { setTracklist, tracklist, tracks } = this.props
    if (selected === null) {
      return false
    }
    const track = tracks.filter((t) => selected.value === t.Id)[0]
    setTracklist([...tracklist,track])
  }

  filterValues = () => {
    const {tracklist, tracks} = this.props
    const ids = tracklist.map((t) => t.Id)
    return tracks.reduce((a, t) => {
      if (!ids.includes(t.Id)) {
        a.push({ value: t.Id, label: t.owner })
      }
      return a
    }, [])
  }

  render() {
    const values = this.filterValues()
    const {togglePlayAll, playAll} = this.props
    return (
      <div>
        <hr className="shadow-sm" />
        <div className="px-3">
          <ActionsBar togglePlayAll={()=>togglePlayAll(!playAll)} playAll={playAll}/>
          <h6 className="text-black-30 pt-3">
            <SelectTrack handleSelect={this.handleSelect} values={values} placeholder={"Select Track"} />
          </h6>
          <Playlist />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    tracks: state.tracks,
    tracklist: state.tracklist || [],
    playAll: state.playAll
  })
}
const mapDispatchToProps = dispatch => ({
  setTracklist: bindActionCreators(setTracklist, dispatch),
  togglePlayAll: bindActionCreators(togglePlayAll, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)