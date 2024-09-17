import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import SearchContainer from "./Pages/SearchContainer"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SearchContainer />
  </React.StrictMode>
);

