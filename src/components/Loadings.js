import React from 'react';

export const Loadings = () => (
    <div className="loading">
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
);

export const LoadingPage = () => (
    <div className="loading-page">
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
);

export default Loadings;
