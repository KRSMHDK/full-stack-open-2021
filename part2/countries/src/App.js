import React, { useState, useEffect } from "react";
import axios from "axios";
// const { REACT_APP_MY_ENV } = process.env;

const FindCountries = ({ filter, handleFilter }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
    </div>
  );
};

const ShowCountry = ({ weather, country }) => {
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
      <div>Weather in {country.capital}</div>
      <div>Temperature: {weather.current.temperature} celcius</div>
      <img src={weather.current.weather_icons[0]} />
      <div>{weather.current.weather_descriptions[0]}</div>
      <div>
        wind: {weather.current.wind_speed} mph direction{" "}
        {weather.current.wind_dir}{" "}
      </div>
    </div>
  );
};

const Result = ({ handleCapitalChange, weather, matches, handleFilter }) => {
  if (matches.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (matches.length === 1) {
    handleCapitalChange(matches[0].capital);
    return (
      <div>
        <ShowCountry weather={weather} country={matches[0]} />
      </div>
    );
  } else {
    return matches.map((matches) => (
      <div>
        {matches.name}{" "}
        <button value={matches.name} onClick={handleFilter}>
          Show
        </button>
      </div>
    ));
  }
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [matches, setMatches] = useState([]);
  const [weather, setWeather] = useState([]);
  const [capital, setCapital] = useState("New york");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleCapitalChange = (capital) => {
    setCapital(capital);
  };
  console.log(weather);
  const resultToShow = matches.filter((match) =>
    match.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setMatches(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_MY_ENV}&query=${capital}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [capital]);

  return (
    <div>
      <FindCountries filter={filter} handleFilter={handleFilter} />
      <Result
        matches={resultToShow}
        handleFilter={handleFilter}
        filter={filter}
        weather={weather}
        handleCapitalChange={handleCapitalChange}
      />
    </div>
  );
};

export default App;
