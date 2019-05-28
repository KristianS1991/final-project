import React from 'react'
import Footer from './Footer'

const AboutUs = () => {

  return (
    <main className="AboutUs">
      <section className="section aboutus-background">
        <div className="container">
          <img></img>
          <h1 className="title is-1 has-text-light"> WHO ARE WE?</h1>
          <hr />
          <h3 className="subtitle is-2 has-text-light"> WHAT MAKES CRUSH DIFFERENT | MEET THE TEAM</h3>
          <hr className="paragraph"/>

          <div className="columns headshots is-vcentered">

            <figure className="image is-128x128">
              <img className="is-rounded" src="./images/cpu-profile-images/cristiano-ronaldo.jpg"></img>
            </figure>

            <figure className="image is-128x128">
              <img className="is-rounded" src="./images/cpu-profile-images/elmo.jpg"></img>
            </figure>

            <figure className="image is-128x128">
              <img className="is-rounded" src="./images/cpu-profile-images/John.jpg"></img>
            </figure>

            <figure className="image is-128x128">
              <img className="is-rounded" src="./images/cpu-profile-images/foreveralone.jpeg"></img>
            </figure>

          </div>
          <p className="has-text-light">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          </p>
          <br />
          <p className="has-text-light">

          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          </p>
          <br />
          <p className="has-text-light">

          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default AboutUs
