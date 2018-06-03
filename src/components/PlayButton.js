import React, { Component } from 'react'

class PlayButton extends Component{

  state = {
    styles:{
      backgroundImage: "linear-gradient(to bottom, #000000 0%,#000000 0%,rgba(0,0,0,0.3) 0%)"
    }
  }

  componentDidMount(){
    //const {audio} = this.props
    //console.log(audio.current)
    
    
    // const timeout = setInterval(()=>{
    //   const percentage = (audio.current.currentTime/audio.current.duration)*100
    //   if(audio.current.currentTime !== audio.current.duration){
    //     //console.log(percentage*100)
    //     this.setState({styles:{backgroundImage: `linear-gradient(to right, #000000 0%,#000000 ${percentage}%,rgba(0,0,0,0.3) 50%)`}})
    //   }
    // },1000)
     
    
  }

  render(){
    const {isPaused, playAndPauseAudio} = this.props
    return (
      <div onClick={playAndPauseAudio} className="btn-play d-flex align-items-center justify-content-center mr-3">
        <div className={isPaused ? "play" : "pause"}></div>
        <div style={this.state.styles} className="btn-play-timeline">
        </div>
      </div>
    )
  }
}

export default PlayButton