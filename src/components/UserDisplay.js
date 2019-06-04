import React from 'react'
// import { Link } from 'react-router-dom'
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
    this.addTrip = this.addTrip.bind(this)
    this.deleteTrip = this.deleteTrip.bind(this)
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
      .then(res => {
        res.data.trips.sort((a, b) => a.id - b.id)
        this.setState({ user: res.data })
      })
  }

  addTrip() {
    axios.post('/api/trips', this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
    // change the below
      .then((res) => this.props.history.push(`/trips/${res.data.id}`))
      .catch((err) => {
        this.setState({errors: err.response.data.error})
      })
  }

  deleteTrip(id) {
    axios.delete(`/api/trips/${id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
    // change the below
      .then(() => {
        const index = this.state.user.trips.findIndex(trip => trip.id === id)
        const trips = [
          ...this.state.user.trips.slice(0, index),
          ...this.state.user.trips.slice(index+1)
        ]

        const user = { ...this.state.user, trips }
        this.setState({ user })
      })
      .catch((err) => {
        console.log(err)
        this.setState({errors: err.response.data.error})
      })
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
                  <div className="field">
                    <label className="label is-small">New Trip</label>
                    <div className="control">
                      <input name="name"
                        placeholder="Enter Trip Name Here"
                        onChange={this.handleChange} />
                    </div>
                    {/*{this.state.errors.email && <div className="help is-danger">{this.state.errors.email}</div>}*/}
                  </div>
                  {/*<Link to ={{
                    pathname: '/addtrip',
                    state: {id: this.props.match.params.id}
                  }}>*/}
                  <button className="button is-danger" onClick={this.addTrip}>Add Trip</button>
                  {/*</Link>*/}

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
                      <TripCard
                        {...trip}
                        deleteTrip={this.deleteTrip}
                      />
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
