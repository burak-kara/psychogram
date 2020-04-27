import React from 'react';
import { GoSearch } from 'react-icons/go';
import { IconContext } from 'react-icons';

const Search = props => {
    const { onChange } = props;
    return (
        <div className="row search-row border-bottom">
            <div className="input-group col-12 padding-0">
                <input
                    type="text"
                    className="form-control input-lg input"
                    placeholder="Search"
                    onChange={onChange}
                />
                <button className="btn search-btn">
                    <IconContext.Provider
                        value={{
                            className: 'search-icon',
                            size: '18',
                        }}
                    >
                        <GoSearch />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    );
};

export default Search;
