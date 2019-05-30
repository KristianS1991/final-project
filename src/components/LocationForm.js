import React from 'react'

const LocationForm = ({ handleChange }) => {

  //Change the link below to reroute to the specific trip, maybe put in loop
  return (
    <form className="form-input">
      <div className="field">
        <label className="label is-small">Location Name</label>
        <div className="control">
          <input name="name"
            placeholder="eg: The Dolphin"
            onChange={handleChange} />
        </div>
        {/*{this.state.errors.username && <div className="help is-danger">{this.state.errors.username}</div>}*/}
      </div>

      <div className="field">
        <label className="label is-small">Postcode</label>
        <div className="control">
          <input name="postcode"
            placeholder="E9 7HN"
            onChange={handleChange} />
        </div>
        {/*{this.state.errors.email && <div className="help is-danger">{this.state.errors.email}</div>}*/}
      </div>

      <button className="button is-info submit-edit-button">Submit</button>
    </form>
  )
}

export default LocationForm
