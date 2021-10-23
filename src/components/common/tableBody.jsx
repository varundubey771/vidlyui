import React, { Component } from "react";
import Heart from "./heart";
import _ from "lodash";

//

class TableBody extends Component {
  getRowData = (item, col) => {
    if (col.content) return col.content(item);

    return _.get(item, col.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((col) => (
              <td key={item._id + (col.key || col.path)}>
                {this.getRowData(item, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
