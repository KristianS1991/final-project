import React from 'react'

// child component of TripShow for inputing locations to a trip
const LocationForm = ({ passedChange, passedSubmit }) => {

  return (
    <div className="map-form">
      <form className="form-input" onSubmit={passedSubmit}>
        <div className="field">
          <label className="label">Location Name</label>
          <div className="control">
            <input name="name"
              placeholder="eg: The Dolphin"
              onChange={passedChange} />
          </div>
        </div>

        <div className="field">
          <label className="label">Postcode</label>
          <div className="control">
            <input name="postcode"
              placeholder="E9 7HN"
              onChange={passedChange} />
          </div>
        </div>

        <button className="button submit-edit-button">Submit</button>
      </form>
    </div>
  )
}

export default LocationForm
