import React, { useState , useContext} from 'react';
import { DocumentContext } from '../App';
function SearchBar(props) {
  const [query, setQuery] = useState('');
  const [documents , setDocuments]= useContext(DocumentContext);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState('');
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:5000/detect-relevancy' , {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({"query_string":query}), // body data type must match "Content-Type" header
      }).then((response) => response.json())
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
  };

  return (
    <div className='search-bar-container'>
        <form className="search-bar" onSubmit={handleSubmit}> 
        <input className="search-input"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
        />
        <button type="submit" 
              className="search-icon"> Search</button>
    </form>
    </div>
    
  );
}

export default SearchBar;
