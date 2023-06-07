import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes ,useParams} from 'react-router-dom';
import './App.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => {
        setShows(data.map(item => item.show));
      });
  }, []);

  return (
    <div className="show-list">
      <h1 className='heading'>LIST OF SHOWS</h1>
      <ul>
        {shows.map(show => (
          <li  key={show.id}>
            <Link to={`/summary/${show.id}`}>
              {show.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ShowSummary = () => {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${showId}`)
      .then(response => response.json())
      .then(data => {
        setShowDetails(data);
      });
  }, [showId]);

  const renderFieldValue = (key, value) => {
    if (typeof value === 'object') {
      // Render nested object as a string
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <div className="show-summary">
      <h1 className='h1'>Summary of Show</h1>
      {Object.entries(showDetails).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {renderFieldValue(key, value)}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<ShowList />} />
          <Route path="/summary/:showId" element={<ShowSummary />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
