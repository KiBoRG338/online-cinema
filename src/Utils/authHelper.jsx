import React from 'react';
import {Redirect} from 'react-router-dom';
import { AUTH_ROUTE } from '../Constants/routes';

export function privateRoutes(Component) {
    return function(props) {
        if (!localStorage.getItem('token')) {
            return <Redirect to={AUTH_ROUTE} />;
        }
        return <Component {...props} />;
    };
}