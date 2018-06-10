import React, { Component } from 'react'
import Playlist from './Playlist'
import ActionsBar from './ActionsBar'
import SelectTrack from './SelectTrack'
import { setTracklist, togglePlayAll, toggleSync } from '../redux/actions/tracks'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

HTMLAudioElement.prototype.stop = function () {
  this.pause();
  this.currentTime = 0.0;
}
class Home extends Component {

  handleSelect = (selected) => {
    //Add to tracklist and remove or add selected from select box

    const { setTracklist, tracklist, tracks } = this.props
    if (selected === null) {
      return false
    }
    let track = tracks.filter((t) => selected.value === t.Id)[0]
    track = Object.assign({}, track)
    setTracklist([...tracklist, track])
  }

  filterValues = () => {
    const { tracklist, tracks } = this.props
    const ids = tracklist.map((t) => t.Id)
    return tracks.reduce((a, t) => {
      if (!ids.includes(t.Id)) {
        a.push({ value: t.Id, label: t.owner })
      }
      return a
    }, [])
  }

  getDuration = (id) => {
    return new Promise(resolve => {
      let duration
      const interval = setInterval(() => {
        if (this.props.durationMap) {
          duration = this.props.durationMap.get(id)
          if (duration) {
            clearInterval(interval)
            resolve(duration)
          }
        }
      }, 500)
    })
  }

  handleSync = async (sync) => {
    const { tracklist } = this.props

    if (tracklist.length === 0) {
      return
    }

    const { tracks, toggleSync, togglePlayAll, setTracklist } = this.props
    if (sync) {
      let leader = 0
      
      let synclist = await tracklist.reduce(async (promise, t) => {
        let duration = await this.getDuration(t.Id)
        if(+duration>leader){
          leader = +duration
        }
        promise.then(arr=>arr.push(t))
        return promise
      }, Promise.resolve([]))
      synclist.map(t => {
        t.bpm = leader
        return t
      })
      setTracklist(synclist)
    } else {
      const tracklistMap = new Map()
      tracklist.map(t => tracklistMap.set(t.Id, t))
      const list = tracks.reduce((a, n) => {
        if (tracklistMap.get(n.Id)) {
          let o = { ...n }
          a.push(o)
        }
        return a
      }, [])
      setTracklist(list)
    }
    togglePlayAll(false)
    toggleSync(sync)
  }

  handlePlayAll = (playAll) => {
    const { togglePlayAll, toggleSync } = this.props
    toggleSync(false)
    togglePlayAll(playAll)
  }

  render() {
    const values = this.filterValues()
    const { playAll, sync } = this.props

    return (
      <div>
        <hr className="shadow-sm" />
        <div className="px-3">
          <ActionsBar handlePlayAll={this.handlePlayAll} playAll={playAll} handleSync={this.handleSync} sync={sync} />
          <h6 className="text-black-30 pt-3">
            <SelectTrack handleSelect={this.handleSelect} values={values} placeholder={"Select Track"} />
          </h6>
          <Playlist />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    tracks: state.tracks,
    tracklist: state.tracklist || [],
    playAll: state.playAll,
    synclist: state.synclist || [],
    sync: state.sync,
    durationMap: state.durationMap
  })
}
const mapDispatchToProps = dispatch => ({
  setTracklist: bindActionCreators(setTracklist, dispatch),
  togglePlayAll: bindActionCreators(togglePlayAll, dispatch),
  toggleSync: bindActionCreators(toggleSync, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)