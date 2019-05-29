import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../lib/Auth'
// import images from '../images'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <section className="section home-container">
        <div className="container title-container has-text-centered">
          <h1 className="title logohome is-1"> CheckPoint </h1>
          <h2 className="subtitle is-2"> Plan your road trips and pub crawls! </h2>
          {!Auth.isAuthenticated() && <Link to="/register"><button className="button is-danger">Sign Up</button></Link> || <Link to="/aboutus"><button className="button is-danger">About CheckPoint</button></Link>}
        </div>
      </section>
    )
  }
}

export default Home
