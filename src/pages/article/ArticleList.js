import React, { useEffect, useState } from 'react';
import { withAuthorization, withEmailVerification } from '../../_session';
import { compose } from 'recompose';
import { snapshotToArray } from '../../_utility/functions';

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
            <div style={{ paddingTop: 'auto' }}>
                <h5>{article.name + '  by ' + article.author}</h5>
            </div>
            <div>
                <p style={{ paddingRight: '1px' }}>{article.detail}</p>
            </div>
            <hr className="article-page.grey" />
        </>
    );

    return (
        <>
            <div>
                <h4>Articles: </h4>
                <hr className="article-page.grey" />
            </div>
            {articleList
                ? articleList.map(obj => <ArticleFrame article={obj} />)
                : null}
            {!loading && <b> Total {articleList.length} Articles found</b>}
        </>
    );
};

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(ArticleList);
