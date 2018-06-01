import React, { Component } from 'react'

const ActionsBar = (props) => {
    const {togglePlayAll, playAll} = props
    return (
      <div>
        <button type="button" className="btn btn-active btn-sm px-3 mr-2">{false?'STOP':'SYNC'}</button>
        <button onClick={togglePlayAll} type="button" className="btn btn-sm px-3">{playAll?'STOP':'PLAY'}</button>
      </div>
    )
}

export default ActionsBar