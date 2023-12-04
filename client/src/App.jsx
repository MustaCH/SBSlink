import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Approved, Declined, Home } from "./components/screens/index";
import ClientProvider from "./context";

function App() {
  return (
    <div>
      <ClientProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/approved" element={<Approved />} />
            <Route path="/declined" element={<Declined />} />
          </Routes>
        </Router>
      </ClientProvider>
    </div>
  );
}

export default App;
