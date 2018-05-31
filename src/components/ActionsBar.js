import React, { Component } from 'react'

const ActionsBar = (props) => {
    const {playAll, isPlayingAll} = props
    return (
      <div>
        <button type="button" className="btn btn-active btn-sm px-3 mr-2">{isPlayingAll?'STOP':'SYNC'}</button>
        <button onClick={playAll} type="button" className="btn btn-sm px-3">{isPlayingAll?'STOP':'PLAY'}</button>
      </div>
    )
}

export default ActionsBar