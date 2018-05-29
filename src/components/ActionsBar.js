import React, { Component } from 'react'

export default class ActionsBar extends Component {

  render(){
    return (
      <div>
        <button type="button" className="btn btn-active btn-sm px-3 mr-2">SYNC</button>
        <button type="button" className="btn btn-sm px-3">PLAY</button>
      </div>
    )
  }
}