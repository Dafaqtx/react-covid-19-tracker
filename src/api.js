export const API_URL = "https://disease.sh/v3/covid-19"
export const API_ALL = `${API_URL}/all`
export const API_COUNTRIES = `${API_URL}/countries`
export const API_HISTORICAL = `${API_URL}/historical/all`

export const getData = async () => {
  try {
    const response = await fetch(API_ALL);
    const data = await response.json();

    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const getCountriesData = async () => {
  try {
    const response = await fetch(API_COUNTRIES);
    const data = await response.json();
    const countries = await data.map(country => ({
      name: country.country,
      value: country.countryInfo.iso2,
    }));

    return {data, countries};

  } catch (error) {
    throw new Error(error)
  }
}

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const getHistoricalData = async (lastDays = 120) => {
  try {
    const response = await fetch(`${API_HISTORICAL}/?lastdays=${lastDays}`);
    const data = await response.json();

    return data
  } catch (error) {
    throw new Error(error)
  }
}