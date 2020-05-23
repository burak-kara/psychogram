import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import * as ROLES from '../../_constants/roles';
import { Form } from 'semantic-ui-react';
import '../../assets/styles/pages/admin.scss';

var policy = {
    min: 6,
    max: 8,
    hasNumber: false,
    hasMixChar: false,
    hasSpecial: false,
};
const AdminPage = props => {
    const { firebase } = props;
    const [minVal, setMinVal] = useState('');
    const [maxVal, setMaxVal] = useState('');
    const [hasNumber, setHasNumber] = useState('');
    const [hasMixChar, setHasMixChar] = useState('');
    const [hasSpecial, setHasSpecail] = useState('');

    const onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'min') {
            if (Number(value) >= 6 && Number(value) <= Number(maxVal))
                setMinVal(value);
        } else if (name === 'max') {
            if (Number(value) >= Number(minVal)) setMaxVal(value);
        } else if (name === 'hasNumber') {
            setHasNumber(event.target.checked);
        } else if (name === 'hasMixChar') {
            setHasMixChar(event.target.checked);
        } else if (name === 'hasSpecial') {
            setHasSpecail(event.target.checked);
        }
    };

    const handlePolicy = () => {
        firebase.policy().update({
            min: minVal,
            max: maxVal,
            hasNumber: hasNumber,
            hasMixChar: hasMixChar,
            hasSpecial: hasSpecial,
        });
    };

    useEffect(() => {
        firebase
            .policy()
            .once('value')
            .then(snapshot => {
                const poliObj = snapshot.val();
                setMinVal(poliObj.min);
                setMaxVal(poliObj.max);
                setHasNumber(poliObj.hasNumber);
                setHasMixChar(poliObj.hasMixChar);
                setHasSpecail(poliObj.hasSpecial);
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
                            <label className="passLable">
                                Min Password Length
                            </label>
                            <input
                                className="passLine"
                                type="number"
                                name="min"
                                onChange={onChange}
                                value={minVal}
                            />
                        </div>

                        <div className="form-group col-md-5">
                            <label className="passLable">
                                Max Password Length
                            </label>
                            <input
                                className="passLine"
                                type="number"
                                name="max"
                                onChange={onChange}
                                value={maxVal}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label className="strength">
                                Including Numbers
                            </label>
                            <input
                                type="checkbox"
                                id="myCheck"
                                name="hasNumber"
                                value={hasNumber}
                                onChange={onChange}
                                checked={hasNumber === true}
                                data-toggle="tooltip"
                                title="[0..9]"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label className="strength">
                                Including mixed characters
                            </label>
                            <input
                                type="checkbox"
                                id="myCheck"
                                name="hasMixChar"
                                value={hasMixChar}
                                onChange={onChange}
                                checked={hasMixChar === true}
                                data-toggle="tooltip"
                                title="[a-z] && [A-Z]"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label className="strength">
                                Including special characters
                            </label>
                            <input
                                type="checkbox"
                                id="myCheck"
                                name="hasSpecial"
                                value={hasSpecial}
                                onChange={onChange}
                                checked={hasSpecial === true}
                                data-toggle="tooltip"
                                title="[!#@$%^&*)(+=._-]"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={handlePolicy}
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
