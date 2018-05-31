import React, { Component } from 'react'
import Slider from './Slider'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setAudioRef, togglePlayingAll, eventStatus } from '../redux/actions/tracks'

class PlaylistItem extends Component {

  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.playBtn = React.createRef();
    this.state = {
      isPlaying: false,
      isMuted: false
    }
  }

  handleVolumeChange = (val) => {
    this.audio.current.volume = (val / 100)
  }

  playAndPauseAudio = (e) => {
    const { isPlaying } = this.state
    this.props.eventStatus(false)
    console.log(isPlaying)
    if (isPlaying) {
      this.audio.current.pause()
    } else {
        this.audio.current.play()
    }
    this.setState({ isPlaying: !this.state.isPlaying })
  }

  muteAndUnmuteAudio = (e) => {
    this.audio.current.muted = !this.state.isMuted
    this.setState({ isMuted: !this.state.isMuted })
  }

  componentDidMount() {
    const { Id } = this.props.track
    this.audioMap = this.props.audioRefs || new Map()
    this.audioMap.set(Id, {
      play: this.playBtn,
      audio: this.audio.current,
      isPlaying: this.state.isPlaying
    })
    this.props.setAudioRef(this.audioMap)
  }

  render() {
    //console.log(this.state.isPlaying)
    const { track, deleteTrack, isPlayingAll, status} = this.props
    const { isMuted, isPlaying } = this.state
    let buttonState
    
    if(status==='looping' || status==='stopLooping'){
      buttonState = isPlayingAll
    }else{
      buttonState = isPlaying
    }
    
    return (
      <div className="border-bottom border-dark py-2 d-flex align-items-start">
        {/* play button */}
        <audio ref={this.audio}>
          <source src={track.url} type="audio/mpeg" />
        </audio>
        <div ref={this.playBtn} onClick={this.playAndPauseAudio} className="btn-play d-flex align-items-center justify-content-center border border-dark rounded-circle mr-3">
          <div className={buttonState ? "pause" : "play"}></div>
        </div>
        <div className="mt-m5 mr-5">
          <div>{track.owner}</div>
          <div className="fz-13">{track.descrition || ''}</div>
          <div className="fz-12 text-black-30">BPM: <span className="text-black-20 fz-11">{track.bpm}</span></div>
        </div>
        <div className="d-flex flex-column align-items-end list-item-right justify-content-between ml-auto">
          {/* delete button */}
          <div onClick={() => deleteTrack(track.Id)} className="delete-btn"></div>
          <div className="d-flex lh-7">
            {/* mute button */}
            <div onClick={this.muteAndUnmuteAudio} className={`mute-btn ${isMuted ? 'unmute' : ''}`}></div>
            <Slider styles={{ width: '40px', height: 0 }} handleChange={this.handleVolumeChange} />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    audioRefs: state.audioRefs,
    isPlayingAll: state.isPlayingAll,
    status: state.status
  }
}
const mapDispatchToProps = dispatch => ({
  setAudioRef: bindActionCreators(setAudioRef, dispatch),
  togglePlayingAll: bindActionCreators(togglePlayingAll, dispatch),
  eventStatus: bindActionCreators(eventStatus, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem)