import React, {Component} from 'react';


export default class CardContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row card-container">
                <div className="col-12">
                    <div className="row card-container-title-row border-bottom">
                        <div className="col-6 h-50 d-inline-block card-container-title-row-title">
                            {this.props.title}
                        </div>
                        <div className="col-6 h-50 d-inline-block text-right">
                            <span
                                className="card-container-title-row-clickable"
                                onClick={() => {
                                    this.props.seeAll()
                                }}
                            >
                                Hepsini Gör
                            </span>
                        </div>
                    </div>
                    <div className="container-fluid border mt-2 card-container-body">
                        <div className="row justify-content-between">
                            <div className="col-6 card">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        Some quick example text to build on the
                                        card title and make up the bulk of the card's content.
                                    </p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="col-6 card">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        Some quick example text to build on the
                                        card title and make up the bulk of the card's content.
                                    </p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="col-5 card">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        Some quick example text to build on the
                                        card title and make up the bulk of the card's content.
                                    </p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="col-5 card">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        Some quick example text to build on the
                                        card title and make up the bulk of the card's content.
                                    </p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}