import React, { useEffect } from 'react';
import notFound from '../../assets/static-images/404.png';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../_constants/routeConstants';

const NotFound = () => {
    const history = useHistory();

    useEffect(() => {
        history.push({
            pathname: ROUTES.NOT_FOUND,
        });
    }, []);

    return (
        <div className="container-fluid not-found-page">
            <div className="row">
                <div className="col-12 image-container">
                    <img className="image" src={notFound} alt="404" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 info-container">
                    <p className="text-center">Sayfa Bulunamadı</p>
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

export default NotFound;
