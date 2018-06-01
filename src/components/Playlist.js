import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setTracklist } from '../redux/actions/tracks'
import PlaylistItem from './PlaylistItem'

class Playlist extends Component {

  state = {
    tracklist:[]
  }

  removeFromTracklist = (id) => {
    if(id===null){
      return false
    }
    const tracklist = this.props.tracklist.filter((t)=>id!==t.Id)
    this.props.setTracklist(tracklist)
  }

  render() {
    const { tracklist, playAll } = this.props
    

    return (
      <div className="border-top">
        {tracklist.map((o, k) => <PlaylistItem playAll={playAll} removeTrack={this.removeFromTracklist} track={o} key={k} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tracklist: state.tracklist || [],
    playAll: state.playAll
  }
}
const mapDispatchToProps = dispatch => ({
  setTracklist: bindActionCreators(setTracklist, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)

