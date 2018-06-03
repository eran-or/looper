import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setTracklist, setSynclist, togglePlayAll, toggleSync } from '../redux/actions/tracks'
import PlaylistItem from './PlaylistItem'

class Playlist extends Component {

  removeFromTracklist = (id) => {
    const {sync, tracklist, synclist, setTracklist, setSynclist, togglePlayAll, toggleSync} = this.props
    if(id===null){
      return false
    }
    if(sync){
      const list = synclist.filter((t)=>id!==t.Id)
      const newTracklist = tracklist.filter((t)=>id!==t.Id)
      setSynclist(list)
      setTracklist(newTracklist)
      if(newTracklist.length===0)
      toggleSync(false)
      
    }else{
      const list = tracklist.filter((t)=>id!==t.Id)
      setTracklist(list)
      if(list.length===0){
        togglePlayAll(false)
      }

    }

  }

  handleSynclist(){
    console.log("handle")
  }

  render() {
    const { tracklist, synclist } = this.props
    const list = synclist.length>0?synclist:tracklist

    return (
      <div className="border-top">
        {list.map((o, k) => <PlaylistItem handleSynclist={this.handleSynclist} removeTrack={this.removeFromTracklist} track={o} key={k} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tracklist: state.tracklist || [],
    synclist: state.synclist || [],
    playAll: state.playAll,
    sync: state.sync
  }
}
const mapDispatchToProps = dispatch => ({
  setTracklist: bindActionCreators(setTracklist, dispatch),
  setSynclist: bindActionCreators(setSynclist, dispatch),
  togglePlayAll: bindActionCreators(togglePlayAll, dispatch),
  toggleSync: bindActionCreators(toggleSync, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)

