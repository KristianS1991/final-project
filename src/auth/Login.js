import React from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'

// import Footer from '../components/Footer'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      errors: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange(e) {
    const data =  {...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data: data})
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login', this.state.data)
      .then(res => {
      // set the token in localStorage
        Auth.setToken(res.data.token)

        console.log(res.data)
        //this.props.history.push('/users')
        this.props.history.push(`/users/${res.data.id}`)
      })
      .catch(() => this.setState({ error: 'Invalid credentials' }))
  }

  render() {
    return (
      <section>
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half-desktop is-two-thirds-tablet">
                <form onSubmit={this.handleSubmit}>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input className="input" name="email" placeholder="eg: leela@planetexpress.nnyc" onChange={this.handleChange} />
                    </div>

                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input className="input" name="password" type="password" placeholder="eg: ••••••••" onChange={this.handleChange} />
                    </div>

                    {this.state.error && <div className="help is-danger">{this.state.error}</div>}

                  </div>
                  <br/>
                  <button className="button is-danger submit-edit-button">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default Login
