import React from 'react'
//import axios from 'axios'
//import {Link} from 'react-router-dom'
//import Auth from '../lib/Auth'

import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

class ShowMap extends React.Component {

  constructor(props) {
    super(props)

    this.markers = []
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapCanvas,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: this.props.zoom,
      center: this.props.center
    })

    navigator.geolocation.getCurrentPosition(pos => {
      this.map.flyTo({
        center: [pos.coords.longitude,pos.coords.latitude],
        zoom: 14
      })

      this.currentLocation = new mapboxgl.Marker()
        .setLngLat([pos.coords.longitude,pos.coords.latitude])
        .addTo(this.map)
    })
  }

  generateMarker(location) {
    return new mapboxgl.Marker()
      .setLngLat([location.longitude, location.latitude])
      .addTo(this.map)
  }

  updateMapPosition() {

  }

  componentDidUpdate(prevProps) {
    console.log('updating...', prevProps, this.props)
    if(prevProps.locations.length !== this.props.locations.length) {
      console.log('Locations have changed, re-draw the markers')
      console.log('markers', this.markers)
      this.markers.forEach(marker => marker.remove())
      this.markers = this.props.locations.map(location => this.generateMarker(location))

      
    }
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
