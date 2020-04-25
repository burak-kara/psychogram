import React from 'react';
import { GoSearch } from 'react-icons/go';

const Search = () => {
    return (
        <div className="row search-row border-bottom">
            <div className="input-group col-12 padding-0">
                <input
                    type="text"
                    className="form-control input-lg input"
                    placeholder="Search"
                />
                <span className="input-group-btn">
                    <button className="btn btn-primary button" type="button">
                        <GoSearch />
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Search;
