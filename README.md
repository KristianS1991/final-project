# final-project

For my final project, I created a fullstack app using MapBox that allows the user to plan out a trip anywhere in the UK. The user experience can be broken down as follows. After a user registers and log’s in, they are brought to their user profile, where they have the option to add a new trip, edit an existing trip, or delete an existing trip. If they decide to add a new trip, they are redirected to a page displaying a map of their current location. This page contains a form which allows you to add new locations to your trip. A pop up appears when you click the marker of a location, displaying the location name, and also giving you the option to remove the location. As each location is added or removed, the trip details and the directions (plotted on the map as a line) between locations are updated. A small table in the bottom right corner displays the total distance of the trip and the number of stops on the trip.

I built this app starting with the back-end, utilizing Python, Flask, and PostgreSQL coupled with an SQL database. Then I proceeded to build the front-end, using JavaScript and React. The app also implements the MapBox and British Postcodes API’s for data related to new locations and routes to the map.

I really enjoyed the entire development process of creating this app. From designing wireframes and then building their corresponding React components, to drawing entity-relationship models for each table and coding their models, controllers, and routes in Flask. 

# SEI Project Four, Full-Stack Application - CheckPoint

## Timeframe
1 Week

## Technologies Used
* React
* JavaScript (ES6)
* Python
* Flask
* SQL
* PostgreSQL
* HTML5
* CSS
* Bulma
* MapBox GL JS
* Webpack
* GitHub

## Installation
1. Clone or download the repository.
2. Run `yarn run:serve` within the repository folder in the terminal, to run the server.
3. In another tab, within the same repository folder, run `yarn run:client`, to run the client.

## Project Scope
For our final project, we were given a timeframe of one week to complete a full-stack application using React for the front-end and Flask (Python framework) for the back-end. To store our data, we were to use an SQL database and PostgreSQL as our relational database management system. This was our first project assigned where we were to implement a relational database. A relational database is simply a database that recognizes the relationships between stored groups of information. 

We were to pick a theme, and create a full-stack application that handles the storage of user data in an SQL database. A user would need to be able to register, login, and based on the theme of the app, create some type of data that would be stored and recognized by the database as being related to that user. For bundling and deployment purposes, we were required to use the module builder Webpack.

## Project Overview
I decided to create an application that allows a user to plan road trips in the UK. By implementing the Mapbox GL JS and British Postcodes APIs, I built a site that lets the user create new trips or edit an existing trip. On the homepage, the user is prompted to register if they are not logged in. After registering, they are redirected to a login page. After logging in, the user is brought to the user's profile page. This page displays the user's existing trips, giving them the option to view, edit, or delete a trip. The user also has the option of creating a new trip. 

If the user decides to add a new trip, they are redirected to a page displaying a map of their current location. This page contains a form which allows you to add new locations to your trip. A pop up appears when you click the marker of a location, displaying the location name, and also giving you the option to remove the location. As each location is added or removed, the trip details and the directions (plotted on the map as a line) between locations are updated. A small table in the bottom right corner displays the total distance of the trip and the number of stops on the trip.

#### Website Navigation
![Football Data Centre]()

#### Entity-Relationship Model
Once a user registers, their data is stored in the SQL database. A user can then create multiple trips, each of which can have multiple locations. The trips are stored in the database as part of a one-to-many relationship, where each trip can have one user and each user can have many trips. Each trip is made up of different locations, which makes up another one-to-many relationship, where each location can have one trip and each trip can have many locations.

#### AJAX Requests
To handle AJAX requests, we used the Axios Javascript library. The biggest difference between using Axios, rather than, `fetch()`, is that you save yourself the step of having to convert the response to a JSON object before manipulating it and setting it to state.

Once the user has logged in, a 'GET' request was made to the API I created to return the user's existing trips. Upon creating a new trip, a 'POST' request is made to the API to add the trip and the user is then directed to the map display page where additional 'POST' requests are made but this time for the locations the previous trip contains. On the map display page, 'DELETE' requests are made when the user removes a location from a trip. I created the functions, `handleSubmit()` and `removeLocation()` to handle the functionality for the 'POST' and 'DELETE' requests for locations on the `TripShow` component. On the user's profile page, they also have the option of deleting a trip, which makes a 'DELETE' request, deleting the entire trip and each location it contains. I added the functions `addTrip()` and `deleteTrip()` to hold the functionality for the 'POST' and 'DELETE' AJAX requests for trips.

#### Location POST Request Breakdown
Adding locations to the database required making two AJAX requests. The first being a 'POST' request from the front-end, handled by the `handleSubmit()` function in the `TripShow` component. The second request was made from the back-end, within the `Location` model. This was a 'GET' request made to the British Postcodes API, where the request contained the postcode of the location the user entered. With that postcode, this API, returned the corresponding geographic data from which the latitude and longitude coordinates were taken and stored as properties on that location.

#### AJAX Requests for Adding a New Location
![Location AJAX Request 1](https://i.imgur.com/ScxmVvk.png)
![Location AJAX Request 2](https://i.imgur.com/RhN6h70.png)

## Process Breakdown
The process of creating this application can be broken down into a series of stages as follows:
#### Research Stage:
1. Brainstorming ideas for the application.
2. Researching open-source APIs relevant to my idea.
3. Requesting an access token for these APIs.
4. Testing AJAX requests to the APIs with Insomnia, to ensure sufficient data in the response.

#### Preliminary Design/Configuration Stages:
1. Drawing wireframes for each of the webpages.
2. Drawing a flowchart for the user experience.
3. Pseudocoding the functionality for each of the components.
4. Configure the module builder, Webpack, ie. installing dependencies, adding `app.js` and `index.html` etc.

#### Development & Testing Stages:
##### Back-End
1. Build the models for each of the data sets, ie. User, Locations, Trips.
2. Build the controllers to handle the incoming AJAX requests.
3. Initialize the router and set the routes for each request on each controller.
4. Test that each AJAX request receives the desired response or outcome, using Insomnia.

##### Front-End
1. Setup a backbone `index.html` template, in which to render the components.
2. Build a router in the `app.js` file, containing the paths to each React component.
3. Build the components. Ensure all AJAX requests are made to the correct paths to correspond with the routes setup on the back-end controllers.
4. Test and refactor along the way.
5. Style the components.

#### Deployment & Presentation Stages:
1. Deploy the application to Heroku.
2. Present our application to the class.

#### Styling
The styling for this application is made up of a combination of the Bulma framework and CSS. Bulma is a framework for CSS, which is very useful for creating general page layouts, however, it is difficult to use this to apply specific styles to HTML elements. Therefore, I added classes and used these to overwrite some of the default Bulma styling in our `style.css` file.

## Challenges
The biggest challenge of this project that we faced was related to time management. Given only two days to create our first React application, it was difficult to plan exactly how much content and functionality we had time to achieve. We decided rather than working separately and then merging our work into one app, we would pair code through the whole project. This way, we could ensure we agreed before adding new features and we could brainstorm about different approaches to solving problems.

## Future Add-ons
One extra feature we would have liked to add to this project is a search bar where the user can search for a specific football player. The search bar would have a dropdown of suggestions that the user could choose from. The user would then click on the player of interest and be redirected to a new page displaying that player's stats. Due to timing constraints, we did not get the opportunity to add this feature.
