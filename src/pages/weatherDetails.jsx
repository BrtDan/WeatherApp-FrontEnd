import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const WeatherDetails = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
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

    if (city) {
      fetchWeather();
    }
  }, [city]);

  // funzione per visualizzare la pagina di caricamento
  const Loading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Loading...</h2>
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-solid" />
      <p className="mt-4 text-lg text-white">
        Please wait while we fetch the weather data.
      </p>
    </div>
  );

  // funzione per visualizzare la pagina di errore
  const ErrorPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-red-500 mb-4">City Not Found</h2>
      <p className="text-lg text-white mb-4">
        We couldn't find any weather data for "{city}".
      </p>
      <p className="text-lg text-white mb-4">
        Please check the city name and try again.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Go Back to Home
      </button>
    </div>
  );

  // visualizza errore o caricamento prima di mostrare i dettagli
  if (error) return <ErrorPage />;
  if (!weatherData) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4 text-white text-center">
        {weatherData.location.name}, {weatherData.location.country}
      </h1>

      <img
        src={`https:${weatherData.current.condition.icon}`}
        alt={weatherData.current.condition.text}
        className="w-32 h-32 mx-auto mb-4"
      />

      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 w-full max-w-md text-center">
        <p className="text-2xl font-semibold text-gray-800">
          Temperature: {weatherData.current.temp_c} °C
        </p>
        <p className="text-lg text-gray-600">
          Feels Like: {weatherData.current.feelslike_c} °C
        </p>
        <p className="text-lg text-gray-600">
          Condition: {weatherData.current.condition.text}
        </p>
        <p className="text-lg text-gray-600">
          Humidity: {weatherData.current.humidity}%
        </p>
        <p className="text-lg text-gray-600">
          Wind Speed: {weatherData.current.wind_kph} km/h
        </p>
        <p className="text-lg text-gray-600">
          Wind Direction: {weatherData.current.wind_dir} (
          {weatherData.current.wind_degree}°)
        </p>
        <p className="text-lg text-gray-600">
          Pressure: {weatherData.current.pressure_mb} mb
        </p>
        <p className="text-lg text-gray-600">
          Visibility: {weatherData.current.vis_km} km
        </p>
        <p className="text-lg text-gray-600">
          UV Index: {weatherData.current.uv}
        </p>
        <p className="text-lg text-gray-600">
          Cloud Cover: {weatherData.current.cloud}%
        </p>
        <p className="text-lg text-gray-600">
          Precipitation: {weatherData.current.precip_mm} mm
        </p>
        <p className="text-lg text-gray-600">
          Wind Gusts: {weatherData.current.gust_kph} km/h
        </p>
        <p className="text-lg text-gray-600">
          Day/Night: {weatherData.current.is_day ? "Day" : "Night"}
        </p>
        <p className="text-lg text-gray-600">
          Local Time: {weatherData.location.localtime}
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default WeatherDetails;
