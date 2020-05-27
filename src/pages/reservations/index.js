import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { compose } from 'recompose';
import * as ROLES from '../../_constants/roles';
import { withStyles } from '@material-ui/core/styles';
import { Paper, LinearProgress } from '@material-ui/core';
import { formatDateAsHours, snapshotToArray } from '../../_utility/functions';
import { withAuthorization, withEmailVerification } from '../../_session';
import ReactNotifications from 'react-browser-notifications';
import {
    EditingState,
    IntegratedEditing,
    ViewState,
} from '@devexpress/dx-react-scheduler';
import {
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    ConfirmationDialog,
    DateNavigator,
    DayView,
    Scheduler,
    TodayButton,
    Toolbar,
    ViewSwitcher,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { LoadingPage } from '../../components/Loadings';
import { useLocation } from 'react-router-dom';

const styles = {
    toolbarRoot: {
        position: 'relative',
    },
    progress: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
    },
    dayScaleCell: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

const formatDayScaleDate = (date, options) => {
    const momentDate = moment(date);
    const { weekday } = options;
    return momentDate.format(weekday ? 'dddd' : 'D');
};

const formatTimeScaleDate = date => moment(date).format('HH:mm');

const currentUser = JSON.parse(localStorage.getItem('authUser'));

const DayScaleCell = withStyles(
    styles,
    'dayScaleCell'
)(({ formatDate, classes, ...restProps }) => (
    <WeekView.DayScaleCell
        {...restProps}
        formatDate={formatDayScaleDate}
        className={classes.dayScaleCell}
    />
));

const TimeScaleCells = restProps => (
    <WeekView.TimeScaleLabel {...restProps} formatDate={formatTimeScaleDate} />
);

const Appointment = ({ children, data, style, ...restProps }) => {
    if (currentUser.role === ROLES.PATIENT) {
        // If the paged is being opened by a patient.
        if (data.userId === currentUser.uid) {
            // Show patients' appointments
            return getAppointment(style, children, restProps, '#84a9ac');
        } else {
            // When a patient on the doctor calendar
            // Block interactions with others' appointments
            // Also change the color
            return (
                <Appointments.Appointment
                    {...restProps}
                    style={{
                        ...style,
                        backgroundColor: '#3b6978',
                        borderRadius: '8px',
                    }}
                    onClick={() => {}}
                    onDoubleClick={() => {}}
                >
                    {children}
                </Appointments.Appointment>
            );
        }
    } else {
        return getAppointment(style, children, restProps, '#84a9ac');
    }
};

const getAppointment = (style, children, restProps, bgColor) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: bgColor,
            borderRadius: '8px',
        }}
    >
        {children}
    </Appointments.Appointment>
);

const AppointmentContent = ({ data, ...restProps }) => {
    if (currentUser.role === ROLES.PATIENT) {
        if (data.userId === currentUser.uid) {
            return (
                <Appointments.AppointmentContent
                    {...restProps}
                    data={data}
                    className="user-appointment-container"
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-12 no-padding">
                                <div className="title">{data.title}</div>
                            </div>
                            <div className="col-12no-padding ">
                                <div className="date">{`Start: ${formatDateAsHours(
                                    data.startDate
                                )}`}</div>
                            </div>
                            <div className="col-12 no-padding">
                                <div className="date">{`End: ${formatDateAsHours(
                                    data.endDate
                                )}`}</div>
                            </div>
                        </div>
                    </div>
                </Appointments.AppointmentContent>
            );
        } else {
            return (
                <Appointments.AppointmentContent
                    {...restProps}
                    data={data}
                    className="other-appointment-container"
                >
                    Not Available
                </Appointments.AppointmentContent>
            );
        }
    } else {
        return (
            <Appointments.AppointmentContent
                {...restProps}
                data={data}
                className="user-appointment-container"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12 no-padding">
                            <div className="title">{data.title}</div>
                        </div>
                        <div className="col-12no-padding ">
                            <div className="date">{`Start: ${formatDateAsHours(
                                data.startDate
                            )}`}</div>
                        </div>
                        <div className="col-12 no-padding">
                            <div className="date">{`End: ${formatDateAsHours(
                                data.endDate
                            )}`}</div>
                        </div>
                    </div>
                </div>
            </Appointments.AppointmentContent>
        );
    }
};

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
    ({ children, classes, ...restProps }) => (
        <div className={classes.toolbarRoot}>
            <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
            <LinearProgress className={classes.progress} />
        </div>
    )
);

const Reservations = props => {
    const { authUser, firebase, history } = props;
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(moment());
    const [currentViewName, setCurrentViewName] = useState('Week');
    const [data, setData] = useState([]);
    const [navi, setNavi] = useState('');

    const formattedData = data ? data.map(item => ({ ...item })) : [];

    useEffect(() => {
        setLoading(true);
        isDoctorCalendar() ? getDoctorCalendar() : getUserCalendar();
    }, [authUser, firebase, currentDate, location]);

    const isDoctorCalendar = () =>
        history &&
        history.location &&
        history.location.state &&
        history.location.state.doctorId;

    const getDoctorCalendar = () => {
        setData([]);
        firebase
            .reservations()
            .orderByChild('endDate')
            .startAt(moment(currentDate).startOf('week').format())
            .endAt(moment(currentDate).endOf('week').format())
            .on('value', snapshot => {
                const temp = [];
                snapshotToArray(snapshot).map(item => {
                    if (
                        history.location &&
                        history.location.state &&
                        item.doctorId === history.location.state.doctorId
                    ) {
                        temp.push(item);
                    }
                });
                setData(temp);
                setLoading(false);
            });
    };

    const getUserCalendar = () =>
        firebase
            .reservations()
            .orderByChild('endDate')
            .startAt(moment(currentDate).startOf('week').format())
            .endAt(moment(currentDate).endOf('week').format())
            .on('value', snapshot => {
                const temp = [];
                snapshotToArray(snapshot).map(item => {
                    if (
                        (authUser.role === ROLES.PATIENT &&
                            item.userId === authUser.uid) ||
                        (authUser.role === ROLES.DOCTOR &&
                            item.doctorId === authUser.uid)
                    ) {
                        temp.push(item);
                    }
                });
                setData(temp);
                setLoading(false);
            });

    const handleCurrentViewNameChange = currentViewName => {
        setCurrentViewName(currentViewName);
    };

    const handleCurrentDateChange = currentDate => {
        setCurrentDate(currentDate);
    };

    const handleChanges = ({ added, changed, deleted }) => {
        const userId = authUser.uid;
        const doctorId = history.location.state.doctorId;

        if (added) {
            const pushRef = firebase.reservations().push({
                ...added,
                userId,
                doctorId,
                startDate: moment(added.startDate).format(),
                endDate: moment(added.endDate).format(),
                isEnded: false,
                flag: true,
            });
            createMeeting(userId, doctorId, pushRef.key);
        }
    };

    const notifyMe = () => {
        if (navi !== '') {
            if (navi.supported()) navi.show();
        }
    };

    const createMeeting = (userId, doctorId, reservationId) => {
        const meetingId = `${userId}_${doctorId}`;
        firebase
            .meeting(meetingId)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    props.firebase
                        .meetings()
                        .child(meetingId)
                        .child('reservations')
                        .push(reservationId);
                } else {
                    // TODO add success, error handling for promise
                    props.firebase
                        .meetings()
                        .child(meetingId)
                        .set({
                            userId,
                            doctorId,
                            lastMessage: {
                                date: moment().format(),
                                message: `Meeting Created ${formatDateAsHours(
                                    moment()
                                )}`,
                                senderId: `${authUser.uid}`,
                            },
                        });
                    props.firebase
                        .meetings()
                        .child(meetingId)
                        .child('reservations')
                        .push(reservationId);
                }
            });
        notifyMe();
    };

    return loading ? (
        <LoadingPage />
    ) : (
        <>
            <Paper className="reservation-calendar">
                <Scheduler data={formattedData} height={780}>
                    <ViewState
                        currentDate={currentDate}
                        currentViewName={currentViewName}
                        onCurrentViewNameChange={handleCurrentViewNameChange}
                        onCurrentDateChange={handleCurrentDateChange}
                    />
                    <DayView startDayHour={9} endDayHour={18} />
                    <WeekView
                        startDayHour={9}
                        endDayHour={18}
                        excludedDays={[0, 6]}
                        dayScaleCellComponent={DayScaleCell}
                        timeScaleLabelComponent={TimeScaleCells}
                    />
                    <Appointments
                        appointmentComponent={Appointment}
                        appointmentContentComponent={AppointmentContent}
                    />
                    <Toolbar
                        {...(loading
                            ? { rootComponent: ToolbarWithLoading }
                            : null)}
                    />
                    {isDoctorCalendar() ? (
                        <EditingState onCommitChanges={handleChanges} />
                    ) : null}
                    {isDoctorCalendar() ? <IntegratedEditing /> : null}
                    {isDoctorCalendar() ? <ConfirmationDialog /> : null}

                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <AppointmentTooltip showOpenButton showCloseButton />
                    <AppointmentForm />
                </Scheduler>
            </Paper>
            <ReactNotifications
                onRef={ref => setNavi(ref)} // Required
                title="MEETING CREATED"
                body=" "
                icon="icon.png"
                tag="abcdef"
                timeout="3000"
            />
        </>
    );
};

const condition = authUser =>
    authUser &&
    (authUser.role === ROLES.PATIENT || authUser.role === ROLES.DOCTOR);

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Reservations);
