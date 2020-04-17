import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';

const Contact = () => {
    return (
        <div>
            <h2>GOT QUESTIONS?</h2>
            <p>
                Ask your question to us via e-mail.
                <a href="mailto:info@psychogram.com">Email Me</a>
            </p>
        </div>
    );
};
const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Contact);
