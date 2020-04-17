import React from 'react';

import { withFirebase } from '../../../_firebase';

const SignOut = ({ firebase }) => (
    <button className="btn btn-danger" onClick={firebase.doSignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOut);
