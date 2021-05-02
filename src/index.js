import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./services/Auth";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import "./index.css";

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
