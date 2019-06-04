import React from 'react'
import { Link } from 'react-router-dom'

const TripCard = ({ id, name, locations, deleteTrip }) => {

  return (
    <article className="media">
      <Link to ={`/trips/${id}`}>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{`${name} : `}</strong>
              {locations.map(location =>
                <small key={location.id}>{` ${location.name} `}</small>
              )}
            </p>
          </div>
        </div>
      </Link>
      <div className="media-right">
        <button className="delete" onClick={() => deleteTrip(id)}></button>
      </div>
    </article>
  )
}

export default TripCard
