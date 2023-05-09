import React, { useState, useEffect, useContext } from 'react';
import DocumentCard from './DocumentCard';
import { DocumentContext } from '../App';
function Document() {
//   const [documents, setDocuments] = useState([]);
  const [documents , setDocuments]= useContext(DocumentContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch document data from the server and update state
    fetch('http://127.0.0.1:5000/get_docs') 
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data);
        setLoading(false);
        setError(null);
       
      })
      .catch((error) => {
        setDocuments([]);
        setLoading(false);
        setError(error.message);
      });
  }, []);
  console.log(documents);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return <div>
    {documents.map((entry) => (
        <DocumentCard key={Math.random(10000)} title = {entry[0]} document={entry[1]}/>
      ))}
  </div>
}

export default Document;
