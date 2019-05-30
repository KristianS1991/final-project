import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Register from './auth/Register'
import Login from './auth/Login'
import AboutUs from './components/AboutUs'
import Footer from './components/Footer'

import UserDisplay from './components/UserDisplay'
import AddTripIndex from './components/AddTripIndex'
// import TripMap from './components/TripMap'
// import UserEdit from './components/UserEdit'

import 'mapbox-gl/dist/mapbox-gl.css'
import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Navbar />
          <Switch>
            {/*<Route path="/users/:id/matches" component={MatchIndex}/>
            <Route path="/users/:id/edit" component={UserEdit}/>
            <Route path="/addtrip" component={AddTrip}/>*/}
            <Route path="/addtrip" component={AddTripIndex}/>
            <Route path="/users/:id" component={UserDisplay}/>
            <Route path="/aboutus" component={AboutUs}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Home}/>
          </Switch>
          <Footer />
        </main>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
