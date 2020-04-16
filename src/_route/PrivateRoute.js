import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routeConstants';

export default ({ component: Component, ...rest }) => {
    return (
        <Route>
            {...rest}
            render=
            {props => {
                if (true) {
                    return Component ? (
                        <Component {...props} />
                    ) : (
                        rest.render(props)
                    );
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
        </Route>
    );
};
