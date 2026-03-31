import weatherService from "../services/weather";
import { useState, useEffect } from "react";

const Country = ({ countryToDisplay }) => {
  const [temperature, setTemperature] = useState(null);

  // Move useEffect ABOVE any conditional returns
  useEffect(() => {
    // Only fetch if countryToDisplay exists and has a capital
    if (countryToDisplay?.capital?.[0]) {
      const id =
        `${countryToDisplay.capital[0]}-${countryToDisplay.name.common}`.toLowerCase();

      weatherService.getWeather(id).then((temp) => {
        setTemperature(temp);
      });
    }
  }, [countryToDisplay]); // Added dependency so it re-runs when country changes

  if (!countryToDisplay) {
    return null;
  }

  return (
    <div>
      <h1>{countryToDisplay.name.common}</h1>
      <p>Capital: {countryToDisplay.capital?.[0]}</p>
      <p>Population: {countryToDisplay.population}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(countryToDisplay.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={countryToDisplay.flags.png}
        alt={`Flag of ${countryToDisplay.name.common}`}
      />
      <h2>
        Weather in {countryToDisplay.capital?.[0]} is {temperature}°C
      </h2>
    </div>
  );
};

export default Country;
