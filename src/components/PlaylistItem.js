import React, { Component } from 'react'
import Slider from './Slider'

class PlaylistItem extends Component {
  constructor(props) {
    super(props)
    this.audio = React.createRef();
    this.state={
      isPaused:true,
      isMuted:false
    }
  }

  handleVolumeChange = (val) => {
    this.audio.current.volume = (val / 100)
  }

  playAndPauseAudio = (e) => {
    console.log(this.audio)
    if (this.audio.current.paused) {
      this.audio.current.play()
    } else {
      this.audio.current.pause()
    }
    this.setState({isPaused:this.audio.current.paused})
  }

  muteAndUnmuteAudio = (e) => {
     this.audio.current.muted = !this.audio.current.muted
    this.setState({ isMuted: this.audio.current.muted })
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    
    if(prevProps.playAll !== this.props.playAll){
      console.log(this.audio)
      let isPaused
      if(this.props.playAll){
        this.audio.current.loop = true
        this.audio.current.play()
        isPaused = false
      }else{
        this.audio.current.loop = false
        this.audio.current.stop()
        isPaused = true
      }
      this.setState({isPaused})
    }
  }

  render() {
    const { track, removeTrack, handleVolumeChange, playAll } = this.props
    const {isPaused, isMuted} = this.state

    return (
      <div className="border-bottom border-dark py-2 d-flex align-items-start">
        {/* play button */}
        <audio ref={this.audio}>
          <source src={track.url} type="audio/mpeg" />
        </audio>

        <div onClick={this.playAndPauseAudio} className="btn-play d-flex align-items-center justify-content-center border border-dark rounded-circle mr-3">
          <div className={isPaused ? "play" : "pause"}></div>
        </div>
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

export default PlaylistItem