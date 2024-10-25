"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [defaultCitiesData, setDefaultCitiesData] = useState([]);

  const defaultCities = ["Imola", "Bologna", "Milan", "Rome"];

  useEffect(() => {
    const fetchDefaultCitiesWeather = async () => {
      try {
        const citiesWeather = await Promise.all(
          defaultCities.map(async (city) => {
            const response = await axios.get(
              `https://weatherapp-backend-fkyc.onrender.com/api/get-weather?q=${encodeURIComponent(
                city
              )}`
            );
            return response.data;
          })
        );
        setDefaultCitiesData(citiesWeather);
      } catch (error) {
        console.error("Error fetching default cities weather:", error);
      }
    };

    fetchDefaultCitiesWeather();
  }, []);

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!city) {
      setError("Please provide the name of the city");
      return;
    }

    try {
      const response = await axios.get(
        `https://weatherapp-backend-fkyc.onrender.com/api/get-weather?q=${encodeURIComponent(
          city
        )}`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found");
      console.error(err);
    }
  };

  const clearSearch = () => {
    setCity("");
    setWeatherData(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[800px]">
      <h1 className="text-5xl font-bold mb-6 text-white">
        Welcome to Weather App
      </h1>
      <p className="text-lg text-white mb-6 max-w-xl text-center">
        Check real-time weather conditions for any city, and explore detailed
        forecasts for major cities.
      </p>

      <Link to="/info">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to info page
        </button>
      </Link>

      {/* città di default */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full max-w-6xl">
        {defaultCitiesData.map((cityData, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-md relative"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {cityData.location.name}, {cityData.location.country}
            </h2>
            <img
              src={`https:${cityData.current.condition.icon}`}
              alt={cityData.current.condition.text}
              className="w-20 h-20 mx-auto mb-4"
            />
            <p className="text-lg">Temp: {cityData.current.temp_c} °C</p>
            <p className="text-lg">
              Condition: {cityData.current.condition.text}
            </p>
            <p className="text-lg">Humidity: {cityData.current.humidity}%</p>{" "}
            <br></br>
            <Link
              to={`/weather/${cityData.location.name}`}
              className="text-blue-500 hover:underline absolute bottom-4 right-4"
            >
              See more details →
            </Link>
          </div>
        ))}
      </div>

      <form
        onSubmit={fetchWeather}
        className="flex flex-col items-center mb-6 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-transparent rounded-full p-3 w-full mb-4 text-black dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition"
        />
        <div className="flex justify-between w-full">
          <button
            type="submit"
            className="bg-white text-blue-600 rounded-full py-3 px-6 font-semibold hover:bg-blue-600 hover:text-white transition shadow-lg"
          >
            Check Weather
          </button>
          <button
            type="button"
            onClick={clearSearch}
            className="bg-red-600 text-white rounded-full py-3 px-6 font-semibold hover:bg-red-700 transition shadow-lg"
          >
            Clear
          </button>
        </div>
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div className="mt-6 bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-md max-w-md w-full relative">
          <h2 className="text-2xl font-semibold mb-2">
            {weatherData.location.name}, {weatherData.location.country},{" "}
            {weatherData.location.region}
          </h2>
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
            className="w-24 h-24 mx-auto mb-4"
          />
          <p className="text-lg">
            Current Temperature: {weatherData.current.temp_c} °C
          </p>
          <p className="text-lg">
            Condition: {weatherData.current.condition.text}
          </p>
          <p className="text-lg">Humidity: {weatherData.current.humidity}%</p>
          <Link
            to={`/weather/${weatherData.location.name}`}
            className="text-blue-500 hover:underline absolute bottom-4 right-4"
          >
            See more details →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
