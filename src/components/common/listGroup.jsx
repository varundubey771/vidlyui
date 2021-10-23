import React, { Component } from "react";

const ListGroup = (props) => {
  const { valueProp, textProp } = props;
  return (
    <ul className="list-group">
      {props.items.map((g) => (
        <li
          onClick={() => props.onItemSelect(g)}
          key={g[valueProp]}
          className={
            g === props.selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {g[textProp]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProp: "name",
  valueProp: "_id",
};

export default ListGroup;
