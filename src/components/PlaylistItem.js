import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setDurationMap } from '../redux/actions/tracks'
import Slider from './Slider'
import PlayButton from './PlayButton'

class PlaylistItem extends Component {
  constructor(props) {
    super(props)
    this.audio = React.createRef()
    this.audioLengthMap = undefined
    this.state = {
      isPaused: true,
      isMuted: false,
      audio: this.audio
    }
  }

  componentDidMount() {
    const { durationMap, setDurationMap } = this.props
    this.audio.current.addEventListener('loadedmetadata', () => {
      durationMap.set(this.props.track.Id, this.audio.current.duration)
      setDurationMap(durationMap)
    })
  }

  handleVolumeChange = (val) => {
    this.audio.current.volume = (val / 100)
  }

  playAndPauseAudio = (e) => {
    if (this.audio.current.paused) {
      this.audio.current.play()
    } else {
      this.audio.current.pause()
    }
    this.setState({ isPaused: this.audio.current.paused })
  }

  muteAndUnmuteAudio = (e) => {
    this.audio.current.muted = !this.audio.current.muted
    this.setState({ isMuted: this.audio.current.muted })
  }

  stopAndPlayAll = (bool) => {
    let isPaused
    if (bool) {
      this.audio.current.loop = true
      this.audio.current.load()
      this.audio.current.play()
      isPaused = false
    } else {
      this.audio.current.loop = false
      this.audio.current.stop()
      isPaused = true
    }
    this.setState({ isPaused })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { playAll, sync } = this.props
    if (prevProps.playAll !== playAll) {
      this.stopAndPlayAll(playAll)
    }else if(prevProps.sync !== sync){
      this.stopAndPlayAll(sync)
    }
  }

  render() {
    const { track, removeTrack } = this.props
    const { isPaused, isMuted, audio } = this.state

    return (
      <div className="border-bottom border-dark py-2 d-flex align-items-start">
        {/* play button */}
        <audio ref={this.audio}>
          <source src={track.url} type="audio/mpeg" />
        </audio>
        <PlayButton isPaused={isPaused} playAndPauseAudio={this.playAndPauseAudio} audio={audio} />
        <div className="mt-m5 mr-5">
          <div>{track.owner}</div>
          <div className="fz-13">{track.descrition || ''}</div>
          <div className="fz-12 text-black-30">BPM: <span className="text-black-20 fz-11">{track.bpm}</span></div>
        </div>
        <div className="d-flex flex-column align-items-end list-item-right justify-content-between ml-auto">
          {/* delete button */}
          <div onClick={() => removeTrack(track.Id)} className="delete-btn"></div>
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

const mapStateToProps = (state) => {
  return {
    durationMap: state.durationMap || new Map(),
    playAll: state.playAll,
    sync: state.sync
  }
}
const mapDispatchToProps = dispatch => ({
  setDurationMap: bindActionCreators(setDurationMap, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem)