import React, { useState, useEffect } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core';

import { InfoBox } from './components';
import { API_ALL, API_COUNTRIES, getData, getCountriesData } from './api';

import './App.css';

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getData().then(data => setCountryInfo(data))
  }, [setCountryInfo]);

  useEffect(() => {
    getCountriesData().then(countries => setCountries(countries))
  }, [setCountries]);

  const onChangeCountry = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? API_ALL
        : `${API_COUNTRIES}/${countryCode}`;

    const response = await fetch(url);
    const data = await response.json();

    setInputCountry(countryCode);
    setCountryInfo(data);
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={onChangeCountry}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value} key={country.name}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus cases" total={2000} cases={10000} />
        <InfoBox title="Recovered" total={3000} cases={12000} />
        <InfoBox title="Deaths" total={6000} cases={150000} />
      </div>

      {/* {InfoBoxs} */}
      {/* {InfoBoxs} */}
      {/* {InfoBoxs} */}

      {/* {Table} */}
      {/* {Graph} */}

      {/* {Map} */}
    </div>
  );
}

export default App;
