import React from 'react';
import ReactNotifications from 'react-browser-notifications';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../_session';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            revList: '',
            mess: '',
            idx: '',
        };
    }

    showNotifications = props => {
        // If the Notifications API is supported by the browser
        // then show the notification
        let len = this.state.revList.length;
        for (let i = 0; i < len; i++) {
            if (this.state.revList[i].flag == false) continue;

            let now = new Date();
            let meetDate = new Date(this.state.revList[i].startDate);
            let diffMs = meetDate - now; // milliseconds between now & Christmas
            let diffDays = Math.floor(diffMs / 86400000); // days
            let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
            let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

            if (
                diffDays === 0 &&
                diffHrs === 0 &&
                diffMins <= 10 &&
                diffMins >= 1
            ) {
                let str =
                    diffDays +
                    ' days, ' +
                    diffHrs +
                    ' hours, ' +
                    diffMins +
                    ' minutes until next meeting';
                this.setState({ mess: str });
                this.setState({ idx: this.state.revList[i].key });
                setTimeout(this.notifyMe, 2000);
            }
        }
    };

    notifyMe = () => {
        if (this.n.supported()) this.n.show();
    };

    handleClick = event => {
        // Do something here such as
        // window.focus() OR
        window.open('http://localhost:3000/meeting');

        // Lastly, Close the notification
        this.props.firebase.reservation(this.state.idx).update({ flag: false });
        this.n.close(event.target.tag);
    };

    componentDidMount() {
        setInterval(() => this.tick(), 60000);
        this.props.firebase
            .reservations()
            .orderByChild('userId')
            .equalTo(this.props.authUser.uid)
            .on('value', snapshot => {
                const obj = snapshot.val();
                if (obj != null) {
                    const list = Object.keys(obj).map(key => ({
                        ...obj[key],
                        key,
                    }));
                    this.setState({ revList: list });
                }
            });
    }

    componentWillUnmount() {
        //       clearInterval(this.timerID);
    }

    tick = () => {
        this.showNotifications();
    };

    render() {
        return (
            <div>
                <ReactNotifications
                    onRef={ref => (this.n = ref)} // Required
                    title="MEETING TIME NOTIFICATION!" // Required
                    body={this.state.mess}
                    icon="icon.png"
                    tag="abcdef"
                    timeout="3000"
                    onClick={event => this.handleClick(event)}
                />
            </div>
        );
    }
}

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Notification);
