import { times } from "lodash";
import React, { Component } from "react";

//columns

//sortColumn : obj

//onSort : function

class TableHeader extends Component {
  handleOnSort = (category) => {
    const sortColumn = { ...this.props.sortColumnn };
    if (category === this.props.sortColumnn.path) {
      sortColumn.order =
        this.props.sortColumnn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = category;
      sortColumn.order = "asc";
    }
    {
      this.props.onSort(sortColumn);
    }
  };

  renderSortIcon = (col) => {
    if (col === this.props.sortColumnn.path) {
      if (this.props.sortColumnn.order === "asc") {
        return <i className="fa fa-sort-asc"></i>;
      } else {
        return <i className="fa fa-sort-desc"></i>;
      }
    }
    return null;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.handleOnSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column.path)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
