import React from 'react'
// import axios from 'axios'
//import {Link} from 'react-router-dom'
//import Auth from '../lib/Auth'

import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

class ShowMap extends React.Component {

  constructor(props) {
    super(props)

    this.markers = []
    // this.lngLatLocations = []
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
    //generate the popup in CDM, dont add to map, then set the lat and long and add to map when you click on it
    //first create an event listener on the marker, click and console log
    const popupEl = document.createElement('DIV')
    const locationName = document.createElement('DIV')
    const button = document.createElement('BUTTON')

    locationName.innerText = location.name
    button.innerText = 'Remove Location'
    button.onclick = () => this.props.removeLocation(location)

    popupEl.appendChild(locationName)
    popupEl.appendChild(button)

    const popup = new mapboxgl.Popup({offset: 25})
      // .setText('Hey')
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
    console.log('updating...', prevProps, this.props)
    if(prevProps.locations.length !== this.props.locations.length) {
      console.log('Locations have changed, re-draw the markers')
      console.log('markers', this.markers)
      this.markers.forEach(marker => marker.remove())
      this.markers = this.props.locations.map(location => this.generateMarker(location))
    }

    // this.props.locations.forEach((location) => {
    //   this.lngLatLocations.push([location.longitude, location.latitude])
    // })

    // this.props.locations.forEach((location, i) => {
    //   if(i === this.props.locations.length - 1) {
    //     this.lngLatLocations.push(`${location.longitude},${location.latitude}`)
    //   } else
    //     this.lngLatLocations.push(`${location.longitude},${location.latitude};`)
    // })
    //
    // this.urlString = this.lngLatLocations.join('')


    if(this.props.locations.length > 1 && this.props.newLocation) {

      this.createURLstr()
      // this.props.getDirections()
      // this.generatePolyline() - CALL THIS after request promise to mapbox directions
    }

    // if(this.props.polylineCoords.length && !this.props.newLocation) {
    //   this.generatePolyline()
    // }



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
