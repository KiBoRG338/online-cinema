import React, { Component } from 'react';
import { connect } from "react-redux";

import { userPostFetch, userLoginFetch } from '../../Store/Actions/userActions';
import LinkTo from '../../Components/Link/index';
import { HOME_ROUTE } from '../../Constants/routes';
import './index.css';


class AuthPage extends Component {
  constructor(){
    super()
    this.state = {
      auth: false,
      email: '',
      username: '',    
      password: '' 
    }
  }

  componentDidUpdate(){
    if(this.props.userStore.loggedIn){
      this.props.history.push("/");
    }
  }

  updateStateAuth = (data) => {
    this.setState({
      auth: data,
      email: '',
      username: '',
      password: ''
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitSignup = event => {
    const { email, username, password} = this.state;
    event.preventDefault();
    this.updateStateAuth(true)
    this.props.userPostFetch({email, username, password});
  }
  
  handleSubmitSignin = event => {
    const { username, password} = this.state;
    event.preventDefault();
    this.props.userLoginFetch({username, password});
  };

  render(){
    return(
      <div>
        <div className="header">
          <h1>Auth page</h1>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-black">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
             <LinkTo to={HOME_ROUTE} linkTitle="Home"/>
            </li>
          </ul>
        </nav>
        <div className="form">
          <div className="selectAuth">
            <button className={this.state.auth ? "unSelectedButton" : "selectedButton"} onClick={(e) => this.updateStateAuth(e, false)}>Sign up</button>
            <button className={this.state.auth ? "selectedButton" : "unSelectedButton"} onClick={(e) => this.updateStateAuth(e, true)}>Sign in</button>
          </div>
          { !this.state.auth ?
          <form onSubmit={this.handleSubmitSignup}>
            <div className="form-group">
                <label htmlFor="inputEmail">Email adress</label>
                <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="inputUsername">Username</label>
                <input type="username" className="form-control" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Sign up</button>
          </form>
          :
          <form onSubmit={this.handleSubmitSignin}>
            <div className="form-group">
                <label htmlFor="inputUsername">Username</label>
                <input name="username" className="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="Enter username" value={this.state.username} onChange={this.handleChange}/>
                <small id="usernameHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input name="password" type="password" className="form-control" id="inputPassword" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </form>
          }
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

const mapDispatchToProps = {
    userPostFetch,
    userLoginFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
