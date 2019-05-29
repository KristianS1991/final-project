import React from 'react'
import { Link } from 'react-router-dom'

const TripCard = ({ content, user }) => {
  return (
    <Link to ={`/users/${user._id}`}>
      <article className="media">


        <figure className="media-left">
          <img className="image-comment" src={user.image} alt={user.username}/>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{user.username}</strong> <small>{content.createdAt}</small>
              <br/>
              {content}
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
