import React, {Component} from 'react'

class ActionsBar extends Component{
  state = {
    active:true
  }
  render(){
    const {handlePlayAll, playAll, sync, handleSync} = this.props

      return (
        <div>
        <button type="button" onClick={()=>{
          handleSync(!sync)
          this.setState({active:true})
        }} className={`btn ${this.state.active?'btn-active':''} btn-sm px-3 mr-2`}>{sync?'STOP':'SYNC'}</button>
        <button type="button" onClick={()=>{
          handlePlayAll(!playAll)
          this.setState({active:false})
        }} className={`btn ${!this.state.active?'btn-active':''} btn-sm px-3`}>{playAll?'STOP':'PLAY'}</button>
      </div>
    )
  }
}

export default ActionsBar