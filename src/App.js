import React, { useState, useEffect } from 'react'
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';

import { InfoBox, Map } from './components';
import { API_ALL, API_COUNTRIES, getData, getCountriesData, fetchData } from './api';

import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  // const [mapCountries, setMapCountries] = useState([]);
  // const [tableData, setTableData] = useState([]);
  // const [casesType, setCasesType] = useState("cases");
  // const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  // const [mapZoom, setMapZoom] = useState(3);

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

      fetchData(url).then(data => setCountryInfo(data))

      setInputCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="Coronavirus cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
            {/* {Table} */}
          <h3>Worldwide new cases</h3>
            {/* {Graph} */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
