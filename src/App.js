import React, { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch countries");
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 className="error">Error: {error}</h2>;

  // Filter countries by search term
  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <div key={index} className="countryCard">
              <img
                src={country.png}
                alt={`${country.common} flag`}
                className="country-flag"
              />
              <div className="country-name">{country.common}</div>
            </div>
          ))
        ) : (
          <h3>No countries found</h3>
        )}
      </div>
    </div>
  );
}

export default App;
