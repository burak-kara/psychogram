import React, { useEffect, useState } from 'react';
import { withAuthorization, withEmailVerification } from '../../_session';
import { compose } from 'recompose';
import { snapshotToArray } from '../../_utility/functions';
import { LoadingPage } from '../../components/Loadings';
import * as ROLES from '../../_constants/roles';
import '../../assets/styles/main.scss';

const ArticleList = props => {
    const [loading, setLoading] = useState(false);
    const [articleList, setArticleList] = useState([]);

    useEffect(() => {
        setLoading(true);
        props.firebase.articles().on('value', snapshot => {
            setArticleList(snapshotToArray(snapshot));
            setLoading(false);
        });
        return () => {
            props.firebase.articles().off();
        };
    }, []);

    const ArticleFrame = ({ article }) => (
        <>
            <div className="article">
                <div className="container-fluid main-container">
                    <div className="flex-container">
                        <h3 className="title">{article.name}</h3>
                        <div className="body">{article.detail}</div>
                        <div className="author-info">
                            <div clas="author-metadata">
                                <div className="username-description">
                                    <h4>by {article.author}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return loading ? (
        <LoadingPage />
    ) : (
        <>
            <div>
                <h4>Articles: </h4>
                <hr className="article-page.grey" />
            </div>
            {articleList
                ? articleList.map(obj => <ArticleFrame article={obj} />)
                : null}
            <b>Total {articleList.length} Articles found</b>
        </>
    );
};

const condition = authUser => authUser && authUser.role === ROLES.PATIENT;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(ArticleList);
