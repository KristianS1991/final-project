import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    console.log(e.target.value)
    const data =  {...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data: data })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({errors: err.response.data.errors}))
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
                    <label className="label">Username</label>
                    <div className="control">
                      <input className="input"
                        name="username"
                        placeholder="eg: leela3000"
                        onChange={this.handleChange} />
                    </div>
                    {this.state.errors.username && <div className="help is-danger">{this.state.errors.username}</div>}
                  </div>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input className="input"
                        name="email"
                        placeholder="eg: leela@planetexpress.nnyc" onChange={this.handleChange} />
                    </div>
                    {this.state.errors.email && <div className="help is-danger">{this.state.errors.email}</div>}
                  </div>

                  <div className="field">
                    <label className="label">Location</label>
                    <div className="select">
                      <select name="location" onChange={this.handleChange}>
                        <option value="">Select</option>
                        <option value="Edinburgh">Edinburgh</option>
                        <option value="London">London</option>
                        <option value="Manchester">Manchester</option>
                        <option value="Birmingham">Birmingham</option>
                        <option value="Bristol">Bristol</option>
                        <option value="Glasgow">Glasgow</option>
                        <option value="Newcastle">Newcastle</option>
                        <option value="York">York</option>
                        <option value="Brighton">Brighton</option>
                        <option value="Belfast">Belfast</option>
                        <option value="Cardiff">Cardiff</option>
                        <option value="Leeds">Leeds</option>
                        <option value="Bath">Bath</option>
                        <option value="Sheffield">Sheffield</option>
                        <option value="Norwich">Norwich</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input className="input"
                        name="password"
                        type="password"
                        placeholder="eg: ••••••••"
                        onChange={this.handleChange} />
                    </div>
                    {this.state.errors.password && <div className="help is-danger">{this.state.errors.password}</div>}
                  </div>

                  <div className="field">
                    <label className="label">Password Confirmation</label>
                    <div className="control">
                      <input className="input"
                        name="passwordConfirmation"
                        type="password"
                        placeholder="eg: ••••••••"
                        onChange={this.handleChange} />
                    </div>
                    {this.state.errors.passwordConfirmation && <div className="help is-danger">{this.state.errors.passwordConfirmation}</div>}
                  </div>
                  <button className="button is-info submit-edit-button">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
}


export default Register
