import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { compose } from 'recompose';
import * as ROLES from '../../_constants/roles';
import { withStyles } from '@material-ui/core/styles';
import { Paper, LinearProgress } from '@material-ui/core';
import { formatDateAsHours, snapshotToArray } from '../../_utility/functions';
import { withAuthorization, withEmailVerification } from '../../_session';
import {
    EditingState,
    IntegratedEditing,
    ViewState,
} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    DayView,
    Appointments,
    Toolbar,
    DateNavigator,
    ViewSwitcher,
    AppointmentForm,
    AppointmentTooltip,
    TodayButton,
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

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
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(moment());
    const [currentViewName, setCurrentViewName] = useState('Week');
    const [data, setData] = useState([]);

    const formattedData = data ? data.map(item => ({ ...item })) : [];

    useEffect(() => {
        isDoctorCalendar() ? getDoctorCalendar() : getUserCalendar();
    }, [authUser, firebase, currentDate]);

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
                    if (item.doctorId === history.location.state.doctorId) {
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
        if (added) {
            firebase.reservations().push({
                ...added,
                userId: authUser.uid,
                doctorId: history.location.state.doctorId,
                startDate: moment(added.startDate).format(),
                endDate: moment(added.endDate).format(),
            });
        }
    };

    return (
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
    );
};

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Reservations);
