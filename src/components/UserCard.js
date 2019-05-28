import React from 'react'

const UserCard = (props) => {

  return (

    <div className="card">

      <div className="card-header">
        <figure>
          <img src={props.image} alt={props.name} />
          <h3 className="card-header-tilte">{props.username}</h3>
        </figure>
      </div>

    </div>
  )
}

export default UserCard
