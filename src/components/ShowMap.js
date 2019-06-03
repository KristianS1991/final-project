import React from 'react'
// import axios from 'axios'
//import {Link} from 'react-router-dom'
//import Auth from '../lib/Auth'

import mapboxgl from 'mapbox-gl'
// import L

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

// const polyline = require('@mapbox/polyline')

class ShowMap extends React.Component {

  constructor(props) {
    super(props)

    this.markers = []
    this.bounds = new mapboxgl.LngLatBounds()
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

  updateMapView(location) {
    this.bounds.extend([location.longitude, location.latitude])

    this.map.flyTo({
      center: this.bounds.getCenter(),
      zoom: 13
    })
  }

  generateMarker(location) {

    const popupEl = document.createElement('DIV')
    const locationName = document.createElement('DIV')
    const button = document.createElement('BUTTON')

    locationName.innerText = location.name
    button.innerText = 'Remove Location'
    button.onclick = () => this.props.removeLocation(location)

    popupEl.appendChild(locationName)
    popupEl.appendChild(button)

    const popup = new mapboxgl.Popup({offset: 25})
      .setDOMContent(popupEl)
      .addTo(this.map)

    const marker = new mapboxgl.Marker()
      .setLngLat([location.longitude, location.latitude])
      .setPopup(popup)
      .addTo(this.map)

    this.updateMapView(location)

    return marker
  }

  generatePolyline() {
    console.log('polyline firing')
    console.log(this.props.polylineCoords)

    // const polyline = L.polyline(this.props.polylineCoords, {color: 'red'}).addTo(this.map)
    const mapLayer = this.map.getLayer('route')

    if(typeof mapLayer !== 'undefined') {
      // Remove map layer & source.
      this.map.removeLayer('route').removeSource('route')
    }

    this.map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': this.props.polylineCoords
          }
        }
      },
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#888',
        'line-width': 8
      }
    })

  }

  createURLstr() {
    const lngLatLocations = []

    this.props.locations.forEach((location, i) => {
      if(i === this.props.locations.length - 1) {
        lngLatLocations.push(`${location.longitude},${location.latitude}`)
      } else
        lngLatLocations.push(`${location.longitude},${location.latitude};`)
    })

    this.urlString = lngLatLocations.join('')
    console.log(this.urlString)

    this.props.getDirections(this.urlString)

  }

  componentDidUpdate(prevProps) {
    // console.log('updating...', prevProps, this.props)

    //reset the markers
    if(prevProps.locations.length !== this.props.locations.length) {
      this.markers.forEach(marker => marker.remove())
      this.markers = this.props.locations.map(location => this.generateMarker(location))
    }

    //trigger the sequence for getting the polyline data if there is > one location
    if(this.props.locations.length > 1 && this.props.newLocation) {
      this.createURLstr()
    }

    //generate the polyline if the array of lat,lng coordinates exists
    if(this.props.polylineCoords.length) {
      this.generatePolyline()
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
