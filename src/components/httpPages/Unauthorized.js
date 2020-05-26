import React, { useEffect } from 'react';
import unauthorized from '../../assets/static-images/401.jpg';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../_constants/routeConstants';

const Unauthorized = () => {
    const history = useHistory();

    useEffect(() => {
        history.push({
            pathname: ROUTES.UNAUTHORIZED,
        });
    }, []);

    return (
        <div className="container-fluid common-page">
            <div className="row">
                <div className="col-12 image-container">
                    <img className="image" src={unauthorized} alt="401" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 info-container">
                    <p className="text-center">
                        Bu Sayfaya Ulaşmak İçin Yetkin Yok
                    </p>
                </div>
                <div className="col-12 btn-container">
                    <button
                        className="btn btn-dark"
                        onClick={() =>
                            history.push({
                                pathname: ROUTES.LANDING,
                            })
                        }
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
