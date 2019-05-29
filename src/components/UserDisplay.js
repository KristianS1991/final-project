import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/Auth'
import Loading from './Loading'
import TripCard from './TripCard'

class UserDisplay extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null,
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    //this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data: data })
  }

  getUser() {
    axios.get(`/api/users/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ user: res.data }))
  }

  componentDidMount() {
    this.getUser()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.getUser()
    }
  }

  canModify() {
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.state.user._id
  }

  render() {
    if (!this.state.user) return <Loading />
    return (
      <section>
        <section className="section user-background">
          <div className="container responsive profile">
            <div className="columns is-multiline is-mobile columns-profile">
              <div className="column is-half-desktop img-profile">
                <figure className="image-profile">
                  <img className="image-profile" src={this.state.user.image || 'https://i0.wp.com/reviveyouthandfamily.org/wp-content/uploads/2013/01/headshot-placeholder.jpg?fit=600%2C600&ssl=1'} alt={this.state.user.name} />
                </figure>
              </div>
              <div className="column is-half-desktop">
                <p className="subtitle is-4">Name: {this.state.user.username}</p>
                <p className="subtitle">Current Location: {this.state.user.location}</p>
                <div className="container is-flex">
                  <Link to ={{
                    pathname: `/users/${this.props.match.params.id}/trips`,
                    state: {id: this.props.match.params.id}
                  }}>
                    <button className="button is-danger">Add a Trip</button>
                  </Link>
                </div>
              </div>
            </div>
            <br/>
            <div className="columns is-multiline is-mobile">
              <hr />

              <div className="column is-full-desktop">
                <p className="subtitle is-4">Trips</p>
              </div>
              {this.state.user.trips &&
              <div className="container">

                <div className="column is-desktop">
                  {this.state.user.trips.map(trip =>
                    <div key={trip.id}>
                      <TripCard {...trip} />
                    </div>
                  )}
                </div>
              </div>
              || 'You haven\'t planend any trips yet.'}
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default UserDisplay
