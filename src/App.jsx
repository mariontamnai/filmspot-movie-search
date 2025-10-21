import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Auth from "./Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
