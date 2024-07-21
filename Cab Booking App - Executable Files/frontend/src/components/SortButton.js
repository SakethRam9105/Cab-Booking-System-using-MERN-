import React from 'react';

const SortButton = ({ sortPriceAscending, handleSortPrice }) => (
  <button
    onClick={handleSortPrice}
    className="btn"
    style={{ backgroundColor: "rgb(0,123,255)" ,color : 'white'}}
  >
    ↓↑
  </button>
);

export default SortButton;
