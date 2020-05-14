import React from 'react';
import { withFirebase } from '../../_firebase';

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

export default withFirebase(Contact);
