import React from 'react';
import ReactDom from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";

ReactDom.render(
    <React.StrictMode>
        <Router>
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
