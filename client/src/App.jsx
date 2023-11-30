import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Approved, Declined, Home } from "./components/screens/index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/approved" element={<Approved />} />
          <Route path="/declined" element={<Declined />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
