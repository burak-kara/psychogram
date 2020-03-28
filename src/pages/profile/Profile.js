import React, {Component} from 'react';
import data from "../../assets/demo_data/profile/data";
import PersonalInfo from "./PersonalInfo";
import ProfileDetails from "./ProfileDetails";

export default class Profile extends Component {
    render() {
        return (
            <div>
                {/* TODO delete extra header and footer divs*/}
                <div className="bg-secondary text-center font-weight-bolder" style={{height: "64px"}}>
                    HEADER
                </div>
                <div className="container-fluid h-auto patient-profile">
                    <div className="row h-auto">
                        <PersonalInfo user={data.user}/>
                        <ProfileDetails user={data.user}/>
                    </div>
                </div>
                <div className="bg-secondary text-center font-weight-bolder" style={{height: "64px"}}>
                    FOOTER
                </div>
            </div>
        );
    }
}