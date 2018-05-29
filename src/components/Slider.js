import React, { Component } from 'react'

class Slider extends Component {

  state = {
    styles:{
      background: "linear-gradient(to right, #000000 0%,#000000 50%,rgba(0,0,0,0.3) 50%)"
    }
  }

  handleChange = (e)=>{
    const value = e.target.value
    this.setState({
      styles:{
        background: `linear-gradient(to right, #000000 0%,#000000 ${value}%,rgba(0,0,0,0.3) ${value}%)`
      }})
      this.props.handleChange(value)
  }
  
  render() {
    const background = this.state.styles
    return (
      <div style={this.props.styles}>
       <input type="range" onChange={this.handleChange} style={background} />
      </div>
    )
  }
}

export default Slider