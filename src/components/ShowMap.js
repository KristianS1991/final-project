import React from 'react'
// import axios from 'axios'
//import {Link} from 'react-router-dom'
//import Auth from '../lib/Auth'

import mapboxgl from 'mapbox-gl'

import * as turf from '@turf/turf'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'


class ShowMap extends React.Component {

  constructor(props) {
    super(props)

    this.markers = []
    this.bounds = new mapboxgl.LngLatBounds()

    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapCanvas,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: this.props.zoom,
      center: this.props.center
    })

    navigator.geolocation.getCurrentPosition(pos => {
      if(!this.props.polylineCoords.length) {
        this.map.flyTo({
          center: [pos.coords.longitude,pos.coords.latitude],
          zoom: 14
        })
      }

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

  removeRoute() {
    const mapRouteLayer = this.map.getLayer('route')
    const mapPointLayer = this.map.getLayer('point')

    if(mapRouteLayer) {
      // Remove map layer & source.
      this.map.removeLayer('route').removeSource('route')
    }

    if(mapPointLayer) {
      // Remove map layer & source.
      this.map.removeLayer('point').removeSource('point')
    }


  }

  generatePolyline() {
    this.route = {
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
    }

    this.map.addLayer(this.route)
    this.generatePoint()
  }

  generatePoint() {
    this.pointData = {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'Point',
        'coordinates': this.props.polylineCoords[0]
      }}

    this.point = {
      'id': 'point',
      'type': 'symbol',
      'source': 'point',
      'layout': {
        'icon-image': 'airport-15',
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true
      }
    }

    this.map.addSource('point', {
      'type': 'geojson',
      'data': this.pointData
    })

    this.map.addLayer(this.point)


    this.animatePrep()
  }

  animatePrep() {
    const lineString = turf.lineString(this.props.polylineCoords)
    this.lineDistance = turf.length(lineString, {units: 'kilometers'})

    console.log(this.lineDistance)

    this.path = []
    this.steps = 500
    this.counter = 0

    for (var i = 0; i < this.lineDistance; i += this.lineDistance/this.steps) {
      var segment = turf.along(lineString, i, {units: 'kilometers'})
      this.path.push(segment.geometry.coordinates)
    }

    this.animate()

  }

  animate() {
    this.pointData.geometry.coordinates = this.path[this.counter]

    this.pointData.properties.bearing = turf.bearing(
      turf.point(this.path[this.counter >= this.steps ? this.counter - 1 : this.counter]),
      turf.point(this.path[this.counter >= this.steps ? this.counter : this.counter + 1])
    )
    //
    this.map.getSource('point').setData(this.pointData)
    //
    if (this.counter < this.steps) {
      requestAnimationFrame(this.animate)
    }

    this.counter = this.counter + 1

    if(this.counter === this.steps - 1) {
      this.counter = 0
    }
  }

  createURLstr() {

    const locations = this.props.locations
      .sort((a, b) => a.id - b.id)
      .map(location => `${location.longitude},${location.latitude}`)
      .join(';')

    this.props.getDirections(locations)

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

    this.removeRoute()
    // generate the polyline if the array of lat,lng coordinates exists
    if(this.props.polylineCoords.length) {
      this.generatePolyline()
    }

    // this.generatePolyline()

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
