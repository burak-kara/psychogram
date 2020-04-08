import React from 'react';
import { withFirebase } from '../../constants/firebase';

const TestClass = props => {
    const handleClick = () => {
        const user = props.firebase.user().on('value', snapshot => {
            console.log(snapshot.val());
        });
    };

    return (
        <div>
            <div>Test</div>
            <button onClick={handleClick}>test</button>
        </div>
    );
};

export default withFirebase(TestClass);
