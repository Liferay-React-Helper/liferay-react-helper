import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

export default function main(props: LiferayParams) {
  ReactDOM.createRoot(
    document.getElementById(props.portletElementId) as HTMLElement,
  ).render(
    <App
      portletNamespace={props.portletNamespace}
      contextPath={props.contextPath}
      portletElementId={props.portletElementId}
      configuration={props.configuration}
    />,
  );
}
