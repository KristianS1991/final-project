import React from 'react'
import axios from 'axios'
//import {Link} from 'react-router-dom'
import Auth from '../lib/Auth'
import Loading from './Loading'

class AddTrip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/matches`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ data: res.data }))
  }

  render() {
    if(!this.state.data) return <Loading />
    return (
      <section>
        <section className="section user-background">
          <div className="container">
            <div className="columns is-multiline">
              <p>Ahoy</p>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default AddTrip
