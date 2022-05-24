import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.items.map((item) => (
          <li
            onClick={() => this.props.onItemSelect(item)}
            className={
              this.props.selectedItem === item
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item[this.props.valueProperty]}
          >
            {item[this.props.textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
