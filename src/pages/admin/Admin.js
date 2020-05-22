import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import * as ROLES from '../../_constants/roles';
import { Checkbox, Form } from 'semantic-ui-react';

const AdminPage = props => {
    const { firebase } = props;
    const [strength, setStrength] = useState('');
    const [length, setLength] = useState('');

    const onChange = event => {
        const name = event.target.name;
        if (name == 'strength') setStrength(event.target.checked);
        else if (name == 'length') {
            if (event.target.value >= 6) setLength(event.target.value);
        }
    };

    const handlingPolicy = () => {
        firebase.policy().update({
            length: length,
            strength: strength,
        });
    };

    useEffect(() => {
        firebase
            .policy()
            .once('value')
            .then(snapshot => {
                const polyObject = snapshot.val();
                setStrength(polyObject.strength);
                setLength(polyObject.length);
            });
    }, []);

    return (
        <div id="containerCSS" className="container">
            <div id="jumboPOL" className="jumbotron">
                <Form className="passPolicy">
                    <strong>PASSWORD POLICY</strong>
                    <br />
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label className="passLable">Password Length</label>
                            <input
                                className="passLine"
                                type="number"
                                name="length"
                                onChange={onChange}
                                value={length}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label className="strength">
                                Password complexity
                            </label>
                            <input
                                type="checkbox"
                                id="myCheck"
                                name={'strength'}
                                value={strength}
                                onChange={onChange}
                                checked={strength === true}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-outline-primary"
                            type="submit"
                            onClick={handlingPolicy}
                        >
                            SUBMIT
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

const condition = authUser => authUser && authUser.role === ROLES.ADMIN;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(AdminPage);
