import React, { Component } from 'react'
import PlaylistItem from './PlaylistItem'
const Playlist = (props) => {
  const { list, deleteTrack } = props
  return (
    <div className="border-top">
      {list.map((o, k) => <PlaylistItem deleteTrack={deleteTrack} track={o} key={k} />)}
    </div>
  )
}

export default Playlist

