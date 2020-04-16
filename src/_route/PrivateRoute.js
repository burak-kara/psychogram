import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routeConstants';
import { isAuthenticated } from '../_helpers';

export default ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isAuthenticated() && Component) {
                    return <Component {...props} />;
                }
                return (
                    <Redirect
                        to={{
                            pathname: ROUTES.SIGN_IN,
                            state: { from: props.location },
                        }}
                    />
                );
            }}
        />
    );
};
