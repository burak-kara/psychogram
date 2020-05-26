import React, { useEffect } from 'react';
import notFound from '../../assets/static-images/404.png';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../_constants/routeConstants';

const NotFound = () => {
    const history = useHistory();

    useEffect(() => {
        history.push({
            pathname: ROUTES.NOT_FOUND,
            state: history.location.state,
        });
    }, []);

    const isInfoExist = () =>
        history.location &&
        history.location.state &&
        history.location.state.info;

    const isReturnPathExist = () =>
        history.location &&
        history.location.state &&
        history.location.state.returnPath;

    return (
        <div className="container-fluid common-page">
            <div className="row">
                <div className="col-12 image-container">
                    <img className="image" src={notFound} alt="404" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 info-container">
                    {isInfoExist() ? (
                        <p className="text-center">
                            {history.location.state.info}
                        </p>
                    ) : (
                        <p className="text-center">Sayfa Bulunamadı</p>
                    )}
                </div>
                <div className="col-3" />
                <div className="col-6 btn-container">
                    <button
                        className="btn btn-secondary"
                        onClick={() =>
                            history.push({
                                pathname: ROUTES.LANDING,
                            })
                        }
                    >
                        Home
                    </button>
                    {isReturnPathExist() ? (
                        <button
                            className="btn btn-secondary"
                            onClick={() =>
                                history.push({
                                    pathname: history.location.state.returnPath,
                                })
                            }
                        >
                            {history.location.state.returnText}
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default NotFound;
