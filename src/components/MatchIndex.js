import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Auth from '../lib/Auth'
import NoMatch from './NoMatch'
import UserCard from './UserCard'
import Footer from './Footer'

class MatchIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/matches`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ users: res.data }))
  }

  render() {
    if(!this.state.users.length) return <NoMatch />
    return (
      <section>
        <section className="section user-background">
          <div className="container">
            <div className="columns is-multiline">
              {this.state.users.map(user =>
                <div key={user._id} className="column is-one-third-desktop is-half-tablet">
                  <Link to ={`/users/${user._id}`}>
                    <UserCard {...user} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </section>
    )
  }
}

export default MatchIndex
