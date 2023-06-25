import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

/**
 * This is the main entry point of the portlet.
 *
 * See https://tinyurl.com/js-ext-portlet-entry-point for the most recent 
 * information on the signature of this function.
 *
 * @param  {Object} params a hash with values of interest to the portlet
 * @return {void}
 */
export default function main(props) {
  ReactDOM.render(
    <App
      portletNamespace={props.portletNamespace}
      contextPath={props.contextPath}
      portletElementId={props.portletElementId}
      configuration={props.configuration}
    />,
    document.getElementById(props.portletElementId),
  );
}