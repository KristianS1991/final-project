import React from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'
import Loading from './Loading'
import TripCard from './TripCard'

class UserShow extends React.Component {

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
      .then((res) => this.props.history.push(`/trips/${res.data.id}`))
      .catch((err) => {
        this.setState({errors: err.response.data.error})
      })
  }

  deleteTrip(id) {
    axios.delete(`/api/trips/${id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
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
              <div className="column is-half-desktop">
                <p className="subtitle is-2">{this.state.user.username}&apos;s Trips</p>
              </div>
            </div>
            <br/>
            <div className="columns is-multiline is-mobile">
              <div className="column is-three-quarters-desktop">
                <p className="subtitle is-4">Trips</p>
                {this.state.user.trips &&
                  <div className="container">
                    {this.state.user.trips.map(trip =>
                      <div key={trip.id}>
                        <TripCard
                          {...trip}
                          deleteTrip={this.deleteTrip}
                        />
                      </div>
                    )}
                  </div>
                  || 'You haven\'t planned any trips yet.'}
              </div>
              <div className="column is-one-quarter-desktop">
                <div className="field">
                  <p className="subtitle is-4">New Trip</p>
                  <div className="control">
                    <input name="name"
                      placeholder="Enter Trip Name Here"
                      onChange={this.handleChange} />
                  </div>
                </div>
                <button className="button is-danger" onClick={this.addTrip}>Add Trip</button>
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default UserShow
