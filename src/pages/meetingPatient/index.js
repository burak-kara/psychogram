import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import { GoSearch } from 'react-icons/go';
import Avatar from '@material-ui/core/Avatar';

const PatientMeetingPage = () => {
    const getCard = () => {
        return (
            <div className="card container-fluid">
                <div className="row h-100">
                    <div className="col-2 d-flex align-items-center justify-content-center">
                        <Avatar
                            alt="Remy Sharp"
                            src="https://www.vincentvangogh.org/images/self-portrait.jpg"
                        />
                    </div>
                    <div className="col-6">
                        <div className="row font-16 font-weight-normal">
                            <span>Burak Kara</span>
                        </div>
                        <div className="row font-14 font-weight-lighter font-italic">
                            <span>Son Mesaj</span>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className="col-12 font-16 font-weight-light text-right pr-1">
                                <span>22.10.2020</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 font-14 font-weight-lighter font-italic text-right pr-1">
                                <span>Bugün</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderMeetingList = () => {
        return (
            <div className="row list-row">
                <div className="col-12 padding-0">
                    {getCard()}
                    {getCard()}
                    {getCard()}
                    {getCard()}
                    {getCard()}
                    {getCard()}
                    {getCard()}
                    {getCard()}
                    {getCard()}
                </div>
            </div>
        );
    };

    const renderSearch = () => {
        return (
            <div className="row search-row border-bottom">
                <div className="input-group col-12 padding-0">
                    <input
                        type="text"
                        className="form-control input-lg input"
                        placeholder="Search"
                    />
                    <span className="input-group-btn">
                        <button
                            className="btn btn-primary button"
                            type="button"
                        >
                            <GoSearch />
                        </button>
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="container-fluid patient-meeting-container">
            <div className="row h-100">
                <div className="col m-lg-4 m-md-3 m-sm-2 m-m-0 padding-0">
                    <div className="container-fluid h-100 main-container">
                        <div className="row h-100">
                            <div className="col-4 col-lg-3 border-right meetings-list-container">
                                {renderSearch()}
                                {renderMeetingList()}
                            </div>
                            <div className="col-8 col-lg-9 padding-0">test</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(PatientMeetingPage);
