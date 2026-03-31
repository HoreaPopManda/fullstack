import { useState, useEffect } from "react";
import axios from "axios";
import countriesService from "./services/countries";
import Countries from "./components/Countries";
import Country from "./components/Country";
import Notification from "./components/Notification";

const App = () => {
  const [value, setValue] = useState("");
  const [allCountries, setAllCountries] = useState([]); // all countries from the API

  const [country, setCountry] = useState(null); // the country that matches the search value, if there is only one match
  const [countries, setCountries] = useState([]); // the countries that match the search value, if there are 10 or less matches
  const [error, setError] = useState("retrieving countries...");

  useEffect(() => {
    countriesService.getAll().then((apiCountries) => {
      console.log("got countries", apiCountries.length);
      setAllCountries(apiCountries);
      setError(null);
    });
  }, []); // monitors when the value of country changes

  useEffect(() => {
    console.log("country changed ", value);
    setError(null);
    let counter = 0;
    if (allCountries.length > 0) {
      console.log("filtering countries for ", value);
      const filteredCountries = allCountries.filter((c) => {
        return c.name.common.toLowerCase().includes(value.toLowerCase());
      });

      console.log("filtering countries length ", filteredCountries.length);
      if (filteredCountries.length > 10) {
        setError("Too many matches, specify another filter");
        setCountries([]);
        setCountry(null);
      } else if (filteredCountries.length === 1) {
        setCountry(filteredCountries[0]);
        setCountries([]);
      } else if (filteredCountries.length > 1) {
        console.log("set countries ", filteredCountries.length);
        setCountries(filteredCountries);
        setCountry(null);
      }
    }
  }, [value]); // monitors when the value of country changes

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      find country: <input value={value} onChange={handleChange} />
      <Notification message={error} />
      <Countries countriesToDisplay={countries} />
      <Country countryToDisplay={country} />
    </div>
  );
};

export default App;
