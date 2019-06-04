import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../lib/Auth'

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
      <section className="add-flex">
        <section className="section home-container height-adjust-home">
          <div className="container title-container has-text-centered add-flex">
            <div className="container">
              <h1 className="title logohome is-1"> CheckPoint </h1>
              <h2 className="subtitle is-2 home-title-2"> Plan your road trips and pub crawls! </h2>
              {!Auth.isAuthenticated() && <Link to="/register"><button className="button">Sign Up</button></Link> || <Link to="/aboutus"><button className="button">About CheckPoint</button></Link>}
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default Home
