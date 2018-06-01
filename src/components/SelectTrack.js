import React, { Component } from 'react'
import Select from 'react-select'
import "react-select/dist/react-select.css"

class SelectTrack extends Component {

  state = {
    value:'',
    options:[]
  }

  handleChange = (value) => {
    this.props.handleSelect(value)
    this.setState({ value })
  }

  render() {
     const { placeholder, values } = this.props
     const { value } = this.state
     
    return (
      <Select
        name="select"
        value={value}
        placeholder={placeholder}
        options={values}
        onChange={this.handleChange}
      />
    )
  }
}

export default SelectTrack