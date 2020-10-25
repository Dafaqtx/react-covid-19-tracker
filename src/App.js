import React, { useState, useEffect } from 'react'
import numeral from "numeral";
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';

import { InfoBox, Map, Table, LineGraph } from './components';
import { API_ALL, API_COUNTRIES, getData, getCountriesData, fetchData } from './api';

import { sortData, prettyPrintStat } from './utils';
import './App.css';
import "leaflet/dist/leaflet.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 59.919996, lng: 30.318382 });
  const [mapZoom, setMapZoom] = useState(2);

  useEffect(() => {
    getData().then(data => setCountryInfo(data))

  }, [setCountryInfo]);

  useEffect(() => {
    getCountriesData().then(({data, countries}) => {
      const sortedData = sortData(data)
      setTableData(sortedData)
      setMapCountries(data);
      setCountries(countries)
    })
  }, [setCountries]);

  const onChangeCountry = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? API_ALL
        : `${API_COUNTRIES}/${countryCode}`;

      fetchData(url).then(data => {
        setCountryInfo(data);
        setInputCountry(countryCode);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(6);
      })

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
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>

        <Map zoom={mapZoom} center={mapCenter} countries={mapCountries} casesType={casesType} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {tableData.length ? (
            <Table countries={tableData} />
          ) : 'Loading...'}

          <h3>Worldwide new cases</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
