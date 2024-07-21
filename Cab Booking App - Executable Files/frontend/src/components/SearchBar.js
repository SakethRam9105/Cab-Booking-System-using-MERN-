import React from 'react';
import SortButton from './SortButton';

const SearchBar = ({ searchCarName, setSearchCarName, searchCarType, setSearchCarType }) => (
  <div className="d-flex align-items-center mb-3">
    <div className="flex-grow-1 me-3">
      <div className="input-group">
        <span className="input-group-text" style={{ backgroundColor: 'rgb(0,123,255)', borderColor: 'rgb(0,123,255)' }}>
          <i className="bi bi-search text-white"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by car name"
          value={searchCarName}
          onChange={(e) => setSearchCarName(e.target.value)}
        />
      </div>
    </div>
    <div className="flex-grow-1 me-3">
      <div className="input-group">
        <span className="input-group-text" style={{ backgroundColor: 'rgb(0,123,255)', borderColor: 'rgb(0,123,255)' }}>
          <i className="bi bi-search text-white"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by car type"
          value={searchCarType}
          onChange={(e) => setSearchCarType(e.target.value)}
        />
      </div>
    </div>
    <div className="flex-grow-1 me-3">
      <div className="input-group">
        <SortButton/>
      </div>
    </div>
  </div>
);

export default SearchBar;
