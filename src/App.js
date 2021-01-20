import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { ROOM_ROUTE, HOME_ROUTE, AUTH_ROUTE } from './Constants/routes';
import RoomPage from './Pages/RoomPage';
import HomePage from './Pages/HomePage';
import AuthPage from './Pages/AuthPage';
import { getProfileFetch } from './Store/Actions/userActions';
import { privateRoutes } from './Utils/authHelper';
import NotFoundPage from './Pages/NotFoundPage';

class App extends Component {
  componentDidMount = () => {
    this.props.getProfileFetch()
  }   
  

  render(){
    return (
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact path={HOME_ROUTE} component={HomePage} />
          <Route exact path={ROOM_ROUTE} component={privateRoutes(RoomPage)} />
          <Route exact path={`${ROOM_ROUTE}/:roomId`} component={privateRoutes(RoomPage)}/>
          <Route exact path={AUTH_ROUTE} component={AuthPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
      
    );
  }
}

const mapStateToProps = (state) => ({
  userStore: state.userStore
});

const mapDispatchToProps = {
  getProfileFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

