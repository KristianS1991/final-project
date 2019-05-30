import React from 'react'
//import axios from 'axios'
//import {Link} from 'react-router-dom'
//import Auth from '../lib/Auth'

import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

class ShowMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapCanvas,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: this.props.zoom,
      center: this.props.center
    })

    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({ zoom: 14, center: [pos.coords.longitude,pos.coords.latitude] })
    })
  }

  componentDidUpdate() {
    this.map.flyTo({
      center: this.state.center,
      zoom: this.state.zoom
    })

    this.currentLocation = new mapboxgl.Marker()
      .setLngLat(this.state.center)
      .addTo(this.map)
  }

  render() {

    return (
      <div>
        <div ref={el => this.mapCanvas = el} className="map" />
      </div>
    )


  }
}

export default ShowMap
