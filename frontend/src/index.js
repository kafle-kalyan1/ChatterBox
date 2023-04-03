import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Socket from './chatsPage/services/utils/socket'

import { ContextProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      {/* <Socket/> */}
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
