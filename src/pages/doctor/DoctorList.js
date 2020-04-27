import React, { Component } from 'react';
import five_star from '../../assets/starLogo/five_star.png';
import four_star from '../../assets/starLogo/four_star.png';
import three_star from '../../assets/starLogo/three_star.png';
import two_star from '../../assets/starLogo/two_star.png';
import one_star from '../../assets/starLogo/one_star.png';
import zero_star from '../../assets/starLogo/zero_star.png';
import { withFirebase } from '../../_firebase';

class DoctorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;
        return (
            <div>
                {!loading && (
                    <h3
                        style={{
                            marginTop: '50px',
                            paddingLeft: '155px',
                        }}
                    >
                        {<DoctorCount users={users} />} Doctors found
                    </h3>
                )}
                <UserList users={users} />
            </div>
        );
    }
}

const Rating = ({ user }) => {
    let rating = user.rating;
    let star = five_star;
    if (rating == 5) {
        star = five_star;
    } else if (rating == 4) {
        star = four_star;
    } else if (rating == 3) {
        star = three_star;
    } else if (rating == 2) {
        star = two_star;
    } else if (rating == 1) {
        star = one_star;
    } else if (rating == 0) {
        star = zero_star;
    }

    return (
        <img
            src={star}
            className="rounded"
            alt="four_star"
            style={{ width: '80%', paddingTop: '20px' }}
        />
    );
};

const DoctorCount = ({ users }) => {
    let i = 0;
    users.map(user => {
        if (user.role == 'DOCTOR') {
            i = i + 1;
        }
    });
    return <span>{i}</span>;
};

const UserList = ({ users }) => {
    return users.map(user => {
        if (user.role == 'DOCTOR') {
            return <DoctorFrame user={user} />;
        }
    });
};

const DoctorFrame = ({ user }) => (
    <div
        className="container"
        style={{
            marginLeft: '100px',
        }}
    >
        <div
            className="jumbotron"
            style={{
                width: '100',
                height: '%50',
                margin: '40px',
                paddingTop: '2%',
                paddingRight: '1%',
                paddingBottom: '2%',
                position: 'float',
            }}
        >
            <div className="row">
                <div className="col-sm-2">
                    <img
                        src={user.profilePictureSource}
                        className="rounded-circle"
                        alt="picture"
                        style={{ width: '85%' }}
                    />
                    <Rating user={user} />
                </div>
                <div className="col-sm-2" style={{ paddingTop: 'auto' }}>
                    <h5>{user.name + ' ' + user.surname}</h5>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: '20px' }}
                    >
                        BOOK
                    </button>
                </div>
                <div className="col-sm-6">
                    <h5>About me</h5>
                    <p style={{ paddingRight: '1px' }}>{user.description}</p>
                </div>
            </div>
        </div>
    </div>
);

export default withFirebase(DoctorList);
