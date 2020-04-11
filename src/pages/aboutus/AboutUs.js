import React from "./node_modules/react";
import psycho from '../../assets/logo/psycho.jpg';

const AboutUs = props => {
    return (
        <div className="AboutUspage">
            <img id="picLoc" src={psycho} alt="main picture" />
            <h2 id="Aboutus">ABOUT US</h2>
            <p>We provide online professional and affordable psychiatric help for people who don't have the chance to get
            face to face help.   </p>
        </div>
    );
};
export default AboutUs; 