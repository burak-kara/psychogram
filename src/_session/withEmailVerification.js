import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../_firebase';
import EmailVerification from '../components/EmailVerification';

const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
        .map(provider => provider.providerId)
        .includes('password');

const withEmailVerification = Component => {
    class WithEmailVerification extends React.Component {
        constructor(props) {
            super(props);

            this.state = { isSent: false };
        }

        onSendEmailVerification = () => {
            this.props.firebase
                .doSendEmailVerification()
                .then(() => this.setState({ isSent: true }));
        };

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        needsEmailVerification(authUser) ? (
                            <EmailVerification
                                onClick={this.onSendEmailVerification}
                                isSent={this.state.isSent}
                            />
                        ) : (
                            <Component {...this.props} />
                        )
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
