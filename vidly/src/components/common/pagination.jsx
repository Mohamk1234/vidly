import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
class Pagination extends Component {
  render() {
    const { pageSize, itemsCount, currentPage, onPageChange } = this.props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => {
            return (
              <li
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <a onClick={() => onPageChange(page)} className="page-link">
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
