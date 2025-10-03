import React, { useState } from "react";
import RegisterVehicle from "./pages/RegisterVehicle";
import RentCalculator from "./pages/RentCalculator";

function App() {
  const [page, setPage] = useState("register");

  return (
    <div>
      <h1>🚗 Car Rental System</h1>
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("register")}>Register Vehicle</button>
        <button onClick={() => setPage("rent")}>Rent Calculator</button>
      </nav>
      {page === "register" ? <RegisterVehicle /> : <RentCalculator />}
    </div>
  );
}

export default App;
