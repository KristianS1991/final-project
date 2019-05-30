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
      center: [-0.07, 51.515],
      zoom: 10
    }
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapCanvas,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: this.state.zoom,
      center: this.state.center
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

    // const { lng, lat, zoom } = this.state

    return (
      <div>
        {/*<div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>*/}
        <div ref={el => this.mapCanvas = el} className="map" />

      </div>

    )
  }
}

export default ShowMap
