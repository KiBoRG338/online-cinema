import React, { Component } from 'react';
import { connect } from 'react-redux';

import LinkTo from '../../Components/Link/index';
import { AUTH_ROUTE, ROOM_ROUTE } from '../../Constants/routes';
import DropDownMenu from '../../Components/DropDownMenu';


class HomePage extends Component {
  render(){
    return(
      <div>
        <div className="header">
          <h1>Home page</h1>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-black">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <LinkTo className="LinkTo" to={ROOM_ROUTE} linkTitle="Rooms"/>
            </li>
          </ul>
          <div style={{float: 'right'}}>
            {
              !this.props.userStore.loggedIn ? 
                <LinkTo to={AUTH_ROUTE} linkTitle="Auth"/> 
                : 
                <DropDownMenu/>
            }
          </div>
        </nav>
        {/* <div className="row">
          <div className="side">...</div>
          <div className="main">...</div>
        </div> */}
        <div className="content">
          Content
        </div>
        <div className="footer">
          <h2>Footer</h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userStore: state.userStore
});

export default connect(mapStateToProps, null)(HomePage);
