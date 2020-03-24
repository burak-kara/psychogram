import React, {Component} from 'react';
import profile_pic from "../../assets/demo_data/profile/profile_pic.jpg";
import data from "../../assets/demo_data/profile/data";
import {GoLocation, MdInsertEmoticon, GoMail, GoCalendar} from "react-icons/all";
import CardContainer from "../../components/CardContainer";

export default class Profile extends Component {
    render() {
        return (
            <div>
                <div className="bg-secondary text-center font-weight-bolder" style={{height: "64px"}}>
                    HEADER
                </div>
                <div className="container-fluid h-auto">
                    <div className="row h-auto">
                        <div className="col-lg-3 pl-5 pr-5 pt-2 pb-4 profile-info">
                            <div className="col-md-12 h-auto text-center">
                                <img src={profile_pic} className="img-fluid rounded-circle"/>
                            </div>
                            <div className="row mt-4">
                                <div className="col-lg-9 col-9">
                                    <div className="row name">
                                    <span>
                                        {`${data.user.name} ${data.user.surname}`}
                                    </span>
                                    </div>
                                    <div className="row username">
                                    <span>
                                        {`${data.user.username}`}
                                    </span>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-3 text-center">
                                    <span className="status-icon" onClick={() => alert("change status")}>
                                        <MdInsertEmoticon/>
                                    </span>
                                </div>
                            </div>
                            <div className="row mt-2 h-auto">
                                <span>
                                    {`${data.user.description}`}
                                </span>
                            </div>
                            <div className="row mt-3">
                                <button
                                    className="btn btn-secondary btn-block"
                                    type="button"
                                    onClick={() => alert("go to settings")}
                                >
                                    Settings
                                </button>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12">
                                    <div className="row text-capitalize">
                                        <span className="profile-icon">
                                            <GoLocation/>
                                            {` ${data.user.location}`}
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span className="profile-icon">
                                            <GoMail/>
                                            {` ${data.user.mail}`}
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span className="profile-icon">
                                            <GoCalendar/>
                                            {` ${data.user.birthday}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 profile-details">
                            <CardContainer
                                title="Son Görüşmeler"
                                seeAll={() => alert("see all meetings")}
                                data={data.user.meetings}
                            />
                            <CardContainer
                                title="Favori Doktorlarım"
                            />
                            <CardContainer
                                title="Favori Makalelerim"
                            />
                            <CardContainer
                                title="Ödeme Yöntemlerim"
                            />
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-12 bg-secondary">
                            FOOTER
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}