import { Route, Routes } from "react-router-dom";
import LoginSignup from "./LoginSignup/LoginSignup";
import Dashboard from "./Dashboard/Dashboard";
import RequestDetails from "./RequestDetails/RequestDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/requests/:id" element={<RequestDetails />} />
    </Routes>
  );
}

export default App;
