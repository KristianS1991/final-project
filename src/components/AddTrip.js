import React from 'react'
//import axios from 'axios'
//import {Link} from 'react-router-dom'
//import Auth from '../lib/Auth'
import Loading from './Loading'
import MapGL, {NavigationControl} from 'react-map-gl'

const TOKEN = 'pk.eyJ1Ijoia3JlZWRhIiwiYSI6ImNqdzd5cDcybDBwaDk0Ym80MWtyZWExdW4ifQ.7DAQG_E6Yzql2DamyP-_qg'

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
}

class AddTrip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: null,
        longitude: null,
        zoom: 14,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      }

    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      const data = {...this.state.viewport, latitude: latitude, longitude: longitude}
      this.setState({ viewport: data })
    })







  }

  // render() {
  //   if(!this.state.data) return <Loading />
  //   return (
  //     <section>
  //       <section className="section user-background">
  //         <div className="container">
  //           <div className="columns is-multiline">
  //             <p>Ahoy</p>
  //           </div>
  //         </div>
  //       </section>
  //     </section>
  //   )
  // }
  render() {
    if (!this.state.viewport.latitude) return <Loading />

    const {viewport} = this.state
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxApiAccessToken={TOKEN}>
        <div className="nav" style={navStyle}>
          <NavigationControl/>
        </div>
      </MapGL>
    )
  }

}


export default AddTrip
