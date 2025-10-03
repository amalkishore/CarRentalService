import React, { useEffect, useState } from "react";
import api from "../api";
import Dropdown from "../components/Dropdown";

export default function RentCalculator() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [days, setDays] = useState("");
  const [rent, setRent] = useState(null);

  useEffect(() => {
    api.get("/vehicles/all").then((res) => {
      setVehicles(res.data.map((v) => ({ value: v.vehicleID, label: v.vehicleName })));
    });
  }, []);

  const calculateRent = async () => {
    if (!vehicleId || !days) return;
    const res = await api.get(`/vehicles/${vehicleId}/rent`);
    setRent(res.data * parseInt(days));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Rent Calculator</h2>
      <Dropdown
        label="Vehicle"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        options={vehicles}
      />

      <div>
        <label>Number of Days</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </div>

      <button onClick={calculateRent} style={{ marginTop: "10px" }}>
        Calculate
      </button>

      {rent !== null && <p>Total Rent: ₹{rent}</p>}
    </div>
  );
}
