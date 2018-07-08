import React from "react";

export const SearchBtn = props => (
  <button {...props} style={{marginBottom: 10 }} className="btn btn-outline-primary btn-block">
    {props.children}
  </button>
);
