import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/Table';
import Axios from 'axios';

function App() {

  // data state to store the Accounts data. Its initial value is an empty array
  const [ data, setData ] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await Axios('http://localhost:8080/api/accounts');
      console.log('result: ', result.data);
      setData(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
