import React, { Component } from 'react'
import Playlist from './Playlist'
import ActionsBar from './ActionsBar'
import SelectTrack from './SelectTrack'
import { setTracklist, togglePlayAll, toggleSync, setSynclist } from '../redux/actions/tracks'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

HTMLAudioElement.prototype.stop = function()
{
    this.pause();
    this.currentTime = 0.0;
}
class Home extends Component {

  handleSelect = (selected) => {
    //Add to list and remove or add selected from and to select box

    const {sync, setTracklist, tracklist, setSynclist, synclist, tracks } = this.props
    if (selected === null) {
      return false
    }
    const track = tracks.filter((t) => selected.value === t.Id)[0]
    if(sync){
      setSynclist([...synclist,track])
    }else{
      setTracklist([...tracklist,track])
    }
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
  canSync = async ()=>{
    const {durationMap, tracklist} = this.props
    
    return new Promise(resolve => {
      if(durationMap&&[durationMap].length===tracklist.length){
        resolve(true)
      }else{
        const interval = setInterval(()=>{
          const {durationMap, tracklist} = this.props
          if(durationMap&&[...durationMap].length===tracklist.length){
            clearInterval(interval)
            resolve(true)
          }
        },500)
      }
    })
  }
  
  handleSync = async (sync)=>{

    const {tracklist} = this.props
    console.log(tracklist)
    if(tracklist.length===0){
      return
    }
    await this.canSync()
    const { toggleSync, durationMap, setSynclist, togglePlayAll} = this.props
    let copy = [...durationMap]
    
    if(sync){
    copy.sort((a,b)=>{
      return (a[1]>b[1]?1:-1)
    })
    const synclist = []

    const leader = tracklist.filter((t)=>copy[0][0]===t.Id)[0]
    let leaderBpm
    leaderBpm = leader.bpm
    
    for(let i=0,l=copy.length;i<l;i++){
      let track = tracklist.filter((t)=>copy[i][0]===t.Id)[0]
      track.bpm = leaderBpm
      synclist.push(track)
    }
    
    setSynclist(synclist)
    
    }else{
      setSynclist([])
    }
    togglePlayAll(false)
    toggleSync(sync)
  }

  handlePlayAll = (playAll)=>{
    const {togglePlayAll, toggleSync} = this.props
    toggleSync(false)
    togglePlayAll(playAll)
  }

  render() {
    const values = this.filterValues()
    const {playAll, sync} = this.props
    
    return (
      <div>
        <hr className="shadow-sm" />
        <div className="px-3">
          <ActionsBar handlePlayAll={this.handlePlayAll} playAll={playAll} handleSync={this.handleSync} sync={sync}/>
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
    playAll: state.playAll,
    synclist: state.synclist || [],
    sync: state.sync,
    durationMap: state.durationMap
  })
}
const mapDispatchToProps = dispatch => ({
  setTracklist: bindActionCreators(setTracklist, dispatch),
  togglePlayAll: bindActionCreators(togglePlayAll, dispatch),
  toggleSync: bindActionCreators(toggleSync, dispatch),
  setSynclist: bindActionCreators(setSynclist, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)