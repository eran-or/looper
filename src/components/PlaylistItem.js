import React, { Component } from 'react'
import Slider from './Slider'

class PlaylistItem extends Component {

  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.state = {
      isPlaying: false,
      isMuted:false
    }
  }

  handleVolumeChange = (val) => {
    this.audio.current.volume = (val / 100)
  }

  playAndPauseAudio = (e) => {
    if (this.state.isPlaying) {
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


  render() {
    const {track,deleteTrack} = this.props
    const {isMuted,isPlaying} = this.state
    return (
      <div className="border-bottom border-dark py-2 d-flex align-items-start">
        {/* play button */}
        <audio ref={this.audio}>
          <source src={track.url} type="audio/mpeg" />
        </audio>
        <div onClick={this.playAndPauseAudio} className="btn-play d-flex align-items-center justify-content-center border border-dark rounded-circle mr-3">
          <div className={!isPlaying ? "play" : "pause"}></div>
        </div>

        <div className="mt-m5 mr-5">
          <div>{track.owner}</div>
          <div className="fz-13">{track.descrition || ''}</div>
          <div className="fz-12 text-black-30">BPM: <span className="text-black-20 fz-11">{track.bpm}</span></div>
        </div>
        <div className="d-flex flex-column align-items-end list-item-right justify-content-between ml-auto">
          {/* delete button */}
          <div onClick={() => deleteTrack(track.Id) } className="delete-btn"></div>
          <div className="d-flex lh-7">
            {/* mute button */}
            <div onClick={this.muteAndUnmuteAudio} className={`mute-btn ${isMuted?'unmute':''}`}></div>
            <Slider styles={{ width: '40px', height: 0 }} handleChange={this.handleVolumeChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default PlaylistItem