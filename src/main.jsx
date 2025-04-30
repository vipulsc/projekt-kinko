import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import * as buffer from "buffer"; // Import everything from the buffer module
import process from "process";

// Polyfill `Buffer` and `process` globally
window.Buffer = buffer.Buffer;
window.process = process;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
