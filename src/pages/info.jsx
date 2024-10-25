import { useNavigate } from "react-router-dom";

const InfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="px-16 text-center flex flex-col items-center justify-center min-h-[860px] p-4 text-white">
      <h1 className="text-5xl font-bold mb-4">Project Information</h1>
      <p className="text-lg mb-4">
        This project is a web application for displaying weather conditions in
        various cities. It uses an external API to fetch weather data and
        present it in a user-friendly format.
      </p>

      <h2 className="text-3xl font-semibold mb-2">Technologies Used</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>React:</strong> A JavaScript library for building user
          interfaces.
        </li>
        <li>
          <strong>JavaScript:</strong> A dynamic programming language that is
          widely used for web development to create interactive and responsive
          user interfaces.
        </li>
        <li>
          <strong>Axios:</strong> A library for making HTTP requests, used to
          interact with the weather API.
        </li>
        <li>
          <strong>Node.js:</strong> A JavaScript runtime built on Chrome's V8
          engine that allows you to run JavaScript on the server side, enabling
          you to build scalable network applications.
        </li>
        <li>
          <strong>Express:</strong> A minimal and flexible Node.js web
          application framework that provides a robust set of features for web
          and mobile applications, making it easy to create APIs and manage
          server routes.
        </li>
        <li>
          <strong>Tailwind CSS:</strong> A CSS framework for creating responsive
          and modern designs.
        </li>
        <li>
          <strong>WeatherAPI:</strong> A robust API for fetching weather data,
          allowing real-time access to weather conditions, forecasts, and other
          meteorological information for various locations worldwide.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mb-2">Main Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>View current weather conditions for a specified city.</li>
        <li>
          Detailed information, including temperature, humidity, wind speed, and
          more.
        </li>
        <li>User-friendly and responsive interface.</li>
        <li>Easy navigation between different cities.</li>
      </ul>

      <h2 className="text-3xl font-semibold mb-2">How It Works</h2>
      <p className="text-lg mb-4">
        Users can enter the name of a city in the search bar to view the current
        weather conditions. The application sends a request to the weather API
        to retrieve the data, which is then displayed in a clear and accessible
        format.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default InfoPage;
