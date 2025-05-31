
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AppContent from "./ProviderContext/AppContent.js";
import DevToolsWarning from "./components/AppToolWarning/index.js";
const App = () => {
  return (
    <Router>
      <DevToolsWarning/>
      <ToastContainer />
      <AppContent />
    </Router>
  );
};
export default App;
