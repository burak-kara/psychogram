import React from 'react';
import CardContainer from '../../components/CardContainer';
import * as ROUTES from "../../_constants/routeConstants";

const ProfileDetails = props => {
    const { history } = props;

    const gotoArticles = () => {
        history.push({
            pathname: ROUTES.ARTICLES,
        });
    };


    return (
        <div className="col-lg-9 col-md-9 col-sm-12 pb-2 profile-details">
            <CardContainer
                title="Favori Makalelerim"
                seeAll={() => gotoArticles()}
                data={props.user.favArticles}
                type={'favArticles'}
            />
        </div>
    );
};

export default ProfileDetails;
