import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Paginate = (props) => {
  let numberOfPages = Math.ceil(props.itemCount / props.pageSize);

  let movieArr = _.range(1, numberOfPages + 1);

  if (numberOfPages === 1) {
    return null;
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {movieArr.map((m) => (
          <li
            key={m}
            className={
              m === props.currentPage ? "page-item active" : "page-item"
            }
          >
            <a className="page-link" onClick={() => props.pageChange(m)}>
              {m}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Paginate.propTypes = {
  itemCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageChange: PropTypes.func.isRequired,
};

export default Paginate;
