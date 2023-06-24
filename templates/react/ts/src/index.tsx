import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

export default function main(props: LiferayParams) {
  ReactDOM.render(
    <App
      portletNamespace={props.portletNamespace}
      contextPath={props.contextPath}
      portletElementId={props.portletElementId}
      configuration={props.configuration}
    />,
    document.getElementById(props.portletElementId) as HTMLElement,
  );
}