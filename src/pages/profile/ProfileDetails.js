import React from 'react';
import CardContainer from '../../components/CardContainer';

const ProfileDetails = props => {
    return (
        <div className="col-lg-9 col-md-9 col-sm-12 pb-2 profile-details">
            <CardContainer
                title="Favori Makalelerim"
                seeAll={() => alert('see all fav articles')}
                data={props.user.favArticles}
                type={'favArticles'}
            />
        </div>
    );
};

export default ProfileDetails;
