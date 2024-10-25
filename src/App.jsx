import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Footer from "./components/footer";
import WeatherDetails from "./pages/weatherDetails";
import Info from "./pages/info";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/weather/:city" element={<WeatherDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
