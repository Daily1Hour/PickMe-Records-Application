import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

export const parcel = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: () => <div></div>,
});
