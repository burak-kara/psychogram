import React from 'react';
import { withFirebase } from '../../_firebase';

const Contact = () => {
    return (
        <div className="contact">
            <h2 className="header mb-4">GOT QUESTIONS?</h2>
            <p className="content pb-5">
                <p> Ask your question to us via e-mail.</p>
                <a href="mailto:info@psychogram.com">Email Us</a>
            </p>
        </div>
    );
};

export default withFirebase(Contact);
