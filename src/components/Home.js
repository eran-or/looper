import React, { Component } from 'react'
import Playlist from './Playlist'
import ActionsBar from './ActionsBar'
import SelectTrack from './SelectTrack'
import { connect } from 'react-redux'

class Home extends React.PureComponent {
  state = {
    values: [],
    tracklist:[]
  }

  addToTracklist = (selected)=>{
    if(selected===null){
      return false
    }
    const track = this.props.tracks.filter((t)=>selected.value===t.Id)[0]
    
    this.setState({ tracklist: [...this.state.tracklist, track],values:[...this.state.values, selected] })
  }
  
  removeFromTracklist = (id)=>{
    if(id===null){
      return false
    }
    const tracklist = this.state.tracklist.filter((t)=>id!==t.Id)
    const values = this.state.values.filter((v)=>id!==v.value)
    this.setState({ tracklist,values })
  }

  filterValues = () => {
    const ids = this.state.values.map((t) => t.value)
    return this.props.tracks.reduce((a, t) => {
      if (!ids.includes(t.Id)) {
        a.push({ value: t.Id, label: t.owner })
      }
      return a
    }, [])
  }

  render() {
    const values = this.filterValues()
    return (
      <div>
        <hr className="shadow-sm" />
        <div className="px-3">
          <ActionsBar />
          <h6 className="text-black-30 pt-3">
            <SelectTrack placeholder={"Select Track"} values={values} handleSelect={this.addToTracklist} />
          </h6>
          <Playlist list={this.state.tracklist} deleteTrack={(id)=>this.removeFromTracklist(id)}/>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  tracks: state.tracks
})
export default connect(mapStateToProps)(Home)