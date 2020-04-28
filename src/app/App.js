import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from '../pages/profile/Profile';
import Home from '../pages/home/Home';
import Login from '../components/signPages/sign-in/SignIn';
import SignUp from '../components/signPages/sign-up/SignUp';
import Contact from '../pages/home/Contact';
import Forum from '../pages/forum/Forum';
import AboutUs from '../pages/aboutus/AboutUs';
import Faq from '../pages/faq/Faq';
import PatientMeetingPage from '../pages/meetingPatient';
import DoctorList from '../pages/doctor/DoctorList';
import * as ROUTES from '../_constants/routeConstants';
import Navigation from '../components/Navigation';
import { withAuthentication } from '../_session';
import AdminPage from '../pages/admin/Admin';
import TestMeetingCreate from '../pages/testCreateMeeting';

const App = () => (
    <Router>
        <Navigation />
        <Route exact path={ROUTES.LANDING} component={Home} />
        <Route path={ROUTES.SIGN_IN} component={Login} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.PROFILE} component={Profile} />
        <Route path={ROUTES.CONTACT} component={Contact} />
        <Route path={ROUTES.FORUM} component={Forum} />
        <Route path={ROUTES.ABOUT_US} component={AboutUs} />
        <Route path={ROUTES.FAQ} component={Faq} />
        <Route path={ROUTES.PATIENT_MEETING} component={PatientMeetingPage} />
        <Route path={ROUTES.DOCTOR_LIST} component={DoctorList} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path="/create" component={TestMeetingCreate} />
    </Router>
);

export default withAuthentication(App);
