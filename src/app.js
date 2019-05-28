import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Register from './auth/Register'
import Login from './auth/Login'
import AboutUs from './components/AboutUs'

// import UserShow from './components/UserShow'
// import MatchIndex from './components/MatchIndex'
// import UserEdit from './components/UserEdit'

import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Navbar />
          <Switch>
            {/*<Route path="/users/:id/matches" component={MatchIndex}/>
            <Route path="/users/:id/edit" component={UserEdit}/>
            <Route path="/users/:id" component={UserShow}/>*/}
            <Route path="/aboutus" component={AboutUs}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Home}/>
          </Switch>
        </main>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
