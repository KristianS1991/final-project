import React from 'react'
import { Link } from 'react-router-dom'

const TripCard = ({ id, name, locations }) => {

  //Change the link below to reroute to the specific trip, maybe put in loop
  return (
    <Link to ={`/users/${id}`}>
      <article className="media">
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
        <div className="media-right">
          <button className="delete"></button>
        </div>
      </article>
    </Link>
  )
}

export default TripCard
