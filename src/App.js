import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ searchText, setSearchText ] = useState("");
  
  return (
    <div className="App">
      <div className="container">
        <h5>League Duo Partner</h5>
        <input type="text"></input>
        <button>Find your account</button>
      </div>
    </div>
  );
}

export default App;
