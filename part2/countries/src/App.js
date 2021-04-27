import React, { useState, useEffect } from "react";
import axios from "axios";

const FindCountries = ({ filter, handleFilter }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
    </div>
  );
};

const ShowCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((lg) => (
          <li>{lg.name}</li>
        ))}
      </ul>
      <img src={country.flag}></img>
    </div>
  );
};

const Result = ({ matches, filter }) => {
  const resultToShow = matches.filter((match) =>
    match.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (resultToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (resultToShow.length === 1) {
    return (
      <div>
        <ShowCountry country={resultToShow[0]} />
      </div>
    );
  } else {
    return resultToShow.map((matches) => <div>{matches.name}</div>);
  }
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [matches, setMatches] = useState([]);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setMatches(response.data);
    });
  }, []);

  return (
    <div>
      <FindCountries filter={filter} handleFilter={handleFilter} />
      <Result matches={matches} filter={filter} />
    </div>
  );
};

export default App;
