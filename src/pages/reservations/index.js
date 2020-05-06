import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { Paper, LinearProgress } from '@material-ui/core';
import { ViewState } from '@devexpress/dx-react-scheduler';
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
} from '@devexpress/dx-react-scheduler-material-ui';
import { withAuthorization, withEmailVerification } from '../../_session';
import { snapshotToArray } from '../../_utility/functions';

const URL = 'https://js.devexpress.com/Demos/Mvc/api/SchedulerData/Get';

const makeQueryString = (currentDate, currentViewName) => {
    const format = 'YYYY-MM-DDTHH:mm:ss';
    const start = moment(currentDate).startOf(currentViewName.toLowerCase());
    const end = start.clone().endOf(currentViewName.toLowerCase());
    return encodeURI(
        `${URL}?filter=[["EndDate", ">", "${start.format(
            format
        )}"],["StartDate", "<", "${end.format(format)}"]]`
    );
};

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

const DayScaleCell = withStyles(
    styles,
    'DayScaleCell'
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

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
    ({ children, classes, ...restProps }) => (
        <div className={classes.toolbarRoot}>
            <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
            <LinearProgress className={classes.progress} />
        </div>
    )
);

const mapAppointmentData = appointment => ({
    ...appointment,
    startDate: appointment.StartDate,
    endDate: appointment.EndDate,
    title: appointment.Text,
});

const Reservations = props => {
    const { authUser, firebase } = props;
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState('2020-05-06');
    const [currentViewName, setCurrentViewName] = useState('Week');
    const [data, setData] = useState([]);
    const [lastQuery, setLastQuery] = useState('');

    const formattedData = data ? data.map(mapAppointmentData) : [];

    // TODO delete
    // useEffect(() => {
    //     const queryString = makeQueryString(currentDate, currentViewName);
    //     if (queryString === lastQuery) {
    //         setLoading(false);
    //         return;
    //     }
    //     fetch(queryString)
    //         .then(response => response.json())
    //         .then(({ data }) => {
    //             console.log(data);
    //             setTimeout(() => {
    //                 setLoading(false);
    //                 setData(data);
    //             }, 600);
    //         })
    //         .catch(() => setLoading(false));
    //     setLastQuery(queryString);
    // }, []);

    useEffect(() => {
        firebase.reservations().on('value', snapshot => {
            setData(snapshotToArray(snapshot));
            setLoading(false);
        });
    }, [authUser, firebase]);

    const handleCurrentViewNameChange = currentViewName => {
        setCurrentViewName(currentViewName);
        setLoading(true);
    };

    const handleCurrentDateChange = currentDate => {
        setCurrentDate(currentDate);
        setLoading(true);
    };

    return (
        <Paper>
            <Scheduler data={formattedData} height={700}>
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
                <Appointments />
                <Toolbar
                    {...(loading
                        ? { rootComponent: ToolbarWithLoading }
                        : null)}
                />
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
