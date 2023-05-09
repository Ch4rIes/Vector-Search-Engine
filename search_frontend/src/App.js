import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import Document from './components/Document';
import { useState, creatContext , useContext } from 'react';
import React from "react";

export const DocumentContext = React.createContext();

function App() {
  const [documents, setDocuments] = useState([]);

  return (
    <DocumentContext.Provider value={[documents , setDocuments]}>
    <div className="App">
          <SearchBar/>
          <Document/>
    </div>
    </DocumentContext.Provider>
  );
}

export default App;