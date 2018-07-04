import React from "react";

export const SearchBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-primary">
    {props.children}
  </button>
);
