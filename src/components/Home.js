import React, { Component } from 'react'
import Playlist from './Playlist'
import ActionsBar from './ActionsBar'
import SelectTrack from './SelectTrack'
import { togglePlayingAll, eventStatus, setAudioRef } from '../redux/actions/tracks'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

HTMLAudioElement.prototype.stop = function()
{
    this.pause();
    this.currentTime = 0.0;
}
class Home extends React.PureComponent {
  state = {
    values: [],
    tracklist:[]
  }

  addToTracklist = (selected)=>{
    if(selected===null){
      return false
    }
    this.props.togglePlayingAll(false)
    const track = this.props.tracks.filter((t)=>selected.value===t.Id)[0]
    
    this.setState({ tracklist: [...this.state.tracklist, track],values:[...this.state.values, selected] })
  }
  
  removeFromTracklist = (id)=>{
    if(id===null){
      return false
    }
    console.log("removeFromTracklist")
    const tracklist = this.state.tracklist.filter((t)=>id!==t.Id)
    const values = this.state.values.filter((v)=>id!==v.value)
    if(tracklist.length===0){
      this.props.togglePlayingAll(false) 
    }
    this.setState({ tracklist,values })
  }

  filterValues = () => {
    const ids = this.state.values.map((t) => t.value)
    return this.props.tracks.reduce((a, t) => {
      if (!ids.includes(t.Id)) {
        a.push({ value: t.Id, label: t.owner })
      }
      return a
    }, [])
  }

  playAll = ()=>{
    const { audioRefs, togglePlayingAll, isPlayingAll, eventStatus, setAudioRef} = this.props
    if(!audioRefs){
      return
    }
    
    togglePlayingAll(!isPlayingAll)
    if(isPlayingAll){
      for (const ref of audioRefs.values()) {
        ref.audio.stop()
        ref.isPlaying = false
        eventStatus("stopLlooping")  
      }
    }else{
      for (const ref of audioRefs.values()) {
        ref.audio.stop()
        ref.audio.play()
        ref.isPlaying = true
        eventStatus("looping")
      }
      
    }
  }

  render() {
    const values = this.filterValues()
    const {isPlayingAll} = this.props
    return (
      <div>
        <hr className="shadow-sm" />
        <div className="px-3">
          <ActionsBar playAll={this.playAll} isPlayingAll={isPlayingAll}/>
          <h6 className="text-black-30 pt-3">
            <SelectTrack placeholder={"Select Track"} values={values} handleSelect={this.addToTracklist} />
          </h6>
          <Playlist list={this.state.tracklist} deleteTrack={(id)=>this.removeFromTracklist(id)}/>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return  ({
    tracks: state.tracks,
    audioRefs: state.audioRefs,
    isPlayingAll:state.isPlayingAll,
    status:state.status
  })
}
const mapDispatchToProps = dispatch => ({
  togglePlayingAll:bindActionCreators(togglePlayingAll,dispatch),
  eventStatus:bindActionCreators(eventStatus,dispatch),
  setAudioRef:bindActionCreators(setAudioRef,dispatch)

})
export default connect(mapStateToProps, mapDispatchToProps)(Home)