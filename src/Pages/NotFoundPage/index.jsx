import React, { Component } from 'react';

import './index.css';
import LinkTo from '../../Components/Link/index';
import { HOME_ROUTE } from '../../Constants/routes';



class NotFoundPage extends Component {
  render(){
    return(
        <div className='divLink'>
            <h1 className="pageTitle">
                404: Page not Found :/
            </h1>
            <h1 className="link">
                <LinkTo to={HOME_ROUTE} linkTitle="Return to Home ?"/>
            </h1>
        </div>
    )
  }
}

export default NotFoundPage;