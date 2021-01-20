import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from 'react-bootstrap';

import { logoutUser } from '../../Store/Actions/userActions';
import './index.css';

class DropDownMenu extends Component {
    render() {
        const {updateInviteState} = this.props;
        return ( 
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {this.props.userStore.user.username}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {updateInviteState ?
                        <Dropdown.Item onClick={updateInviteState}>Ввести инвайт-код...</Dropdown.Item>
                        :
                        ''
                        }
                        <Dropdown.Item href="#/action-2">Настройки</Dropdown.Item>
                        <Dropdown.Item onClick={this.props.logoutUser}>Выйти</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        )
    }
}

const mapStateToProps = (state) => ({
    userStore: state.userStore
  });
  
const mapDispatchToProps = {
    logoutUser
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DropDownMenu);