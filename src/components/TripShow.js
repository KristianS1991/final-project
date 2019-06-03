import React from 'react'
import axios from 'axios'
//import {Link} from 'react-router-dom'
import Auth from '../lib/Auth'
import ShowMap from './ShowMap'
import LocationForm from './LocationForm'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

class TripShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [-0.07, 51.515],
      zoom: 10,
      data: {
        // trip: this.props.match.params.id
      },
      // coordinates: [],
      trip: {
        locations: []
      },
      // polylineCoords: [],
      errors: {},
      polylineCoords: [],
      newLocation: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeLocation = this.removeLocation.bind(this)
    this.getDirections = this.getDirections.bind(this)

  }

  removeLocation(location) {
    console.log(location.id)
    console.log('TODO: actually remove the location...')

    axios.delete(`/api/trips/${this.props.match.params.id}/locations/${location.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({
        trip: res.data,
        newLocation: true
      }))
      // maybe call this.getDirections here? - need to update coordinates upon remove
      // .then(res => this.setState({ polylineCoords: res.data }))
      .catch((err) => this.setState({errors: err.response.data.error}))

  }

  generatePolyline() {
    console.log('polyline generating')
  }

  getDirections(coordinates) {
    // console.log(coordinates, typeof coordinates, 'coords from gD')

    axios.get(`https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}.json?access_token=pk.eyJ1Ijoia3JlZWRhIiwiYSI6ImNqdzd5cDcybDBwaDk0Ym80MWtyZWExdW4ifQ.7DAQG_E6Yzql2DamyP-_qg&geometries=geojson`)
      .then(res => {
        this.setState({
          polylineCoords: res.data.routes[0].geometry.coordinates,
          newLocation: false
        })
      })
      .then(() => console.log(this.state.polylineCoords))
      .then(() => {
        this.generatePolyline()
      })
      .catch((err) => this.setState({errors: err}))

  }



  handleChange(e) {
    const data =  {...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    e.target.reset()

    axios.post(`/api/trips/${this.props.match.params.id}/locations`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ trip: res.data, newLocation: true }))
      .catch((err) => this.setState({errors: err.response.data.error}))



  }

  componentDidMount() {
    axios.get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }))
  }

  componentDidUpdate() {

  }


  render() {

    return (
      <div>
        <ShowMap
          locations={this.state.trip.locations}
          center={this.state.center}
          zoom={this.state.zoom}
          removeLocation={this.removeLocation}
          polylineCoords={this.polylineCoords}
          getDirections={this.getDirections}
          newLocation={this.state.newLocation}
        />
        <LocationForm
          passedChange={this.handleChange}
          passedSubmit={this.handleSubmit}
        />

      </div>

    )
  }
}

export default TripShow
