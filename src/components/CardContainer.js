import React from 'react';

const cardTypes = {
    MEETING: "meetings",
    FAVORITE_DOCTORS: "favDocs",
    FAVORITE_ARTICLES: "favArticles",
    PAYMENT_METHODS: "payment"
};

const CardContainer = (props) => {
    const renderCardBody = () =>
        props.data ? (
            props.data.map((item) => {
                let fields = setObjectFields(item);
                return (
                    <div className="col-sm-6 mb-2">
                        <div className="card">
                            <div className="card-body" key={item.id}>
                                <h5 className="card-title">{fields[0]}</h5>
                                <p className="card-text">
                                    {fields[1]}
                                </p>
                            </div>
                            <div className="card-footer text-right bg-transparent border-secondary">
                                <button className="btn card-btn" onClick={() => alert("button clicked")}>
                                    Go somewhere
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <div>
                Nothing to show
            </div>
        );


    const setObjectFields = (item) => {
        let fields = [];
        switch (props.type) {
            case cardTypes.MEETING:
                fields.push(item.doctor);
                fields.push(item.notes);
                break;
            case cardTypes.FAVORITE_DOCTORS:
                fields.push(`${item.name} ${item.surname}`);
                fields.push(item.notes);
                break;
            case cardTypes.FAVORITE_ARTICLES:
                fields.push(`${item.title}, ${item.year}`);
                fields.push(item.abstract);
                break;
            case cardTypes.PAYMENT_METHODS:
                fields.push(item.type);
                fields.push(item.abstract);
                break;
            default:
                fields.push("Veri Yok")
        }
        return fields
    };

    return (
        <div className="row card-container">
            <div className="col-12">
                <div className="row card-container-title-row border-bottom">
                    <div className="col-6 h-50 d-inline-block card-container-title-row-title">
                        {props.title}
                    </div>
                    <div className="col-6 h-50 d-inline-block text-right">
                        <span
                            className="card-container-title-row-clickable"
                            onClick={() => {
                                props.seeAll()
                            }}
                        >
                            Hepsini Gör
                        </span>
                    </div>
                </div>
                <div className="row mt-2 pt-2">
                    {renderCardBody()}
                </div>
            </div>
        </div>
    );

};

export default CardContainer;