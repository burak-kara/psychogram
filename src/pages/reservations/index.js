import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import moment from 'moment';
import { withAuthorization, withEmailVerification } from '../../_session';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
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
};

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
    const [currentDate, setCurrentDate] = useState('2017-05-23');
    const [currentViewName, setCurrentViewName] = useState('Day');
    const [data, setData] = useState(null);
    const [lastQuery, setLastQuery] = useState('');

    const formattedData = data ? data.map(mapAppointmentData) : [];

    useEffect(() => {
        const queryString = makeQueryString(currentDate, currentViewName);
        if (queryString === lastQuery) {
            setLoading(false);
            return;
        }
        fetch(queryString)
            .then(response => response.json())
            .then(({ data }) => {
                setTimeout(() => {
                    setLoading(false);
                    setData(data);
                }, 600);
            })
            .catch(() => setLoading(false));
        setLastQuery(queryString);
    }, []);

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
            <Scheduler data={formattedData} height={660}>
                <ViewState
                    currentDate={currentDate}
                    currentViewName={currentViewName}
                    onCurrentViewNameChange={handleCurrentViewNameChange}
                    onCurrentDateChange={handleCurrentDateChange}
                />
                <DayView startDayHour={9} endDayHour={18} />
                <WeekView startDayHour={9} endDayHour={18} />
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
                <AppointmentForm readOnly />
            </Scheduler>
        </Paper>
    );
};

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Reservations);
