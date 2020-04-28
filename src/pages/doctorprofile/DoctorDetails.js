import React from 'react';
import CardContainer from '../../components/CardContainer';

const DoctorDetails = props => {
    return (
        <div className="col-lg-9 col-md-9 col-sm-12 pb-2 profile-details">
            <CardContainer
                title="Son Görüşmeler"
                seeAll={() => alert('see all meetings')}
                data={props.user.meetings}
                type={'meetings'}
            />
            <CardContainer
                title="Favori Makalelerim"
                seeAll={() => alert('see all fav articles')}
                data={props.user.favArticles}
                type={'favArticles'}
            />
            <CardContainer
                title="Ödeme Yöntemlerim"
                seeAll={() => alert('see all payment methods')}
                data={props.user.paymentMethods}
                type={'payment'}
            />
        </div>
    );
};

export default DoctorDetails;
