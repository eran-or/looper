import React from 'react'
import Playlist from './Playlist'
import ActionsBar from './ActionsBar'

const Home = ()=>(
  <div>
    <hr className="shadow-sm" />
    <div className="px-3">
      <ActionsBar />
      <h6 className="text-black-30 pt-3">Select Track</h6>
      <Playlist />
    </div>
  </div>
)
export default Home