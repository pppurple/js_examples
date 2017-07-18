import React from "react";
import { render } from "react-dom";
import Viewer from "./Viewer";

const filename = new URL(location.href).searchParams.get("filename");

render(<Viewer src={`file://${filename}`} />, document.getElementById("app"));
