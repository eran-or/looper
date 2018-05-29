import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlaylistItem from './PlaylistItem'

class Playlist extends Component {

  render(){
    const tracks = this.props.tracks
    return (
      <div className="border-top">
        {tracks.map((o,k) => <PlaylistItem track={o} key={k}/>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks
  }
}

export default connect(mapStateToProps)(Playlist)

