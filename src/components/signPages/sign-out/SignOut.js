import React from 'react';

import { withFirebase } from '../../../_firebase';

const SignOut = ({ firebase }) => (
    <div onClick={firebase.doSignOut}>Sign Out</div>
);

export default withFirebase(SignOut);
