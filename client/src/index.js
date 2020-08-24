import React from "react";
import ReactDOM from "react-dom";
import { CurrentUserProvider } from "./components/CurrentUserContext";

import App from "./App";

ReactDOM.render(
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>,
  document.getElementById("root")
);
