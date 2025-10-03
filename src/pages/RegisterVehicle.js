import React, { useState, useEffect } from "react";
import api from "../api";
import Dropdown from "../components/Dropdown";

export default function RegisterVehicle() {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [numVehicles, setNumVehicles] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (vehicleType) {
      api.get(`/vehicles?type=${vehicleType}`).then((res) => {
        setVehicleOptions(
          res.data.map((v) => ({ value: v.vehicleID, label: v.vehicleName }))
        );
      });
    } else {
      setVehicleOptions([]);
      setVehicleId("");
    }
  }, [vehicleType]);

  const handleSubmit = async () => {
    if (!vehicleId || !numVehicles) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/register", {
        vehicleID: parseInt(vehicleId),
        numberOfVehicles: parseInt(numVehicles),
      });
      setMessage(`Registered successfully! RegisterID: ${res.data.registerID}`);
    } catch (err) {
      setMessage("Error: " + err.response?.data);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Vehicle Information</h2>
      <Dropdown
        label="Vehicle Type"
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        options={[
          { value: "A", label: "A" },
          { value: "B", label: "B" },
          { value: "C", label: "C" },
        ]}
      />

      <Dropdown
        label="Vehicle Name"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        options={vehicleOptions}
      />

      <div>
        <label>Number of Vehicles</label>
        <input
          type="number"
          max="999"
          value={numVehicles}
          onChange={(e) => setNumVehicles(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Add
      </button>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
