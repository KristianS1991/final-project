import React from 'react'
import axios from 'axios'
//import {Link} from 'react-router-dom'
import Auth from '../lib/Auth'
import ShowMap from './ShowMap'
import LocationForm from './LocationForm'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

class AddTripIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [-0.07, 51.515],
      zoom: 10,
      data: {
        // trip: this.props.match.params.id
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data =  {...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data: data })
    console.log(this.state.data)
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post(`/api/locations/${this.props.match.params.id}`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .catch((err) => {
        this.setState({errors: err.response.data.error})
      })
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }


  render() {

    // const { lng, lat, zoom } = this.state
    const handleChange = this.handleChange
    const handleSubmit = this.handleSubmit

    return (
      <div>
        {/*<div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>*/}
        {/*<div ref={el => this.mapCanvas = el} className="map" />*/}

        <ShowMap
          {...this.state}
        />
        <LocationForm
          passedChange={handleChange}
          passedSubmit={handleSubmit}
        />

      </div>

    )
  }
}

export default AddTripIndex
