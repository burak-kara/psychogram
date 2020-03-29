import React, {useState} from "react";
import profile_pic from "../../assets/demo_data/profile/profile_pic.jpg";
import {GoCalendar, GoLocation, GoMail, MdInsertEmoticon} from "react-icons/all";
import {OverlayTrigger, Popover} from "react-bootstrap";
import Emoji from 'a11y-react-emoji'

const PersonalInfo = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="col-lg-3 col-md-3 col-sm-12 col-12 pl-5 pr-5 pt-2 pb-4 profile-info">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-12 col-md-12 col-sm-6 col-6 h-auto text-center">
                    <img src={profile_pic} className="img-fluid rounded-circle" alt=""/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-9 col-9">
                    <div className="row font-18 font-weight-bold">
                        <span>
                            {`${props.user.name} ${props.user.surname}`}
                        </span>
                    </div>
                    <div className="row username font-weight-lighter font-italic">
                        <span>
                            {`${props.user.username}`}
                        </span>
                    </div>
                </div>
                <div className="col-lg-3 col-3 text-right pr-0">
                    <OverlayTrigger
                        placement="right"
                        trigger="click"
                        delay={{show: 250, hide: 400}}
                        onClick={handleClick}
                        overlay={
                            <Popover id="popover-basic">
                                <Popover.Title as="h3">
                                    Durumunu Değiştir
                                </Popover.Title>
                                <Popover.Content>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-3">
                                                <Emoji symbol="😀" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                            <div className="col-3">
                                                <Emoji symbol="😂" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                            <div className="col-3">
                                                <Emoji symbol="😎" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                            <div className="col-3">
                                                <Emoji symbol="🥰" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3">
                                                <Emoji symbol="😴" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                            <div className="col-3">
                                                <Emoji symbol="🤑" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                            <div className="col-3">
                                                <Emoji symbol="😤" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                            <div className="col-3">
                                                <Emoji symbol="🤒" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3">
                                                <Emoji symbol="🤢" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                            <div className="col-3">
                                                <Emoji symbol="😇" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                            <div className="col-3">
                                                <Emoji symbol="🥳" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                            <div className="col-3">
                                                <Emoji symbol="😈" style={{fontSize: "32px", cursor:"pointer"}}/>
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Content>
                            </Popover>
                        }
                    >
                        <Emoji symbol="😀" style={{fontSize: "32px", cursor:"pointer"}}/>
                    </OverlayTrigger>
                </div>
            </div>
            <div className="row mt-2 h-auto">
                <span>
                    {`${props.user.description}`}
                </span>
            </div>
            <div className="row mt-3">
                <button
                    className="btn btn-secondary btn-block"
                    type="button"
                    onClick={props.openSettings}
                >
                    Profili Düzenle
                </button>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div className="row text-capitalize">
                        <div className="col-12 no-padding">
                            <Emoji symbol="📍" style={{fontSize: "18px"}} className="ml-1"/>
                            <span className="align-middle ml-1">
                                {` ${props.user.location}`}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 no-padding">
                            <Emoji symbol="📧" style={{fontSize: "18px"}}/>
                            <span className="align-middle">
                                {` ${props.user.mail}`}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 no-padding">
                            <Emoji symbol="🗓" style={{fontSize: "18px"}}/>
                            <span className="align-middle ml-1">
                                {` ${props.user.birthday}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;