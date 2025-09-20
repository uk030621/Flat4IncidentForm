"use client";
import { useState } from "react";

// Generate random 7-character alphanumeric incident code
function generateIncidentCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function IncidentForm({ onSubmit, initialData }) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      email: "",
      flatNumber: "",
      date: "",
      time: "",
      description: "",
      impact: "",
      reportedTo: "",
      referenceNo: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "flatNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      setForm({ ...form, [name]: digitsOnly });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleKeyDown = (e) => {
    const invalidKeys = ["e", "E", "+", "-", ".", ","];
    if (invalidKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      incidentCode: form.incidentCode || generateIncidentCode(),
    };
    onSubmit(data);
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "flatNumber", label: "Your Flat Number", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "time", label: "Time", type: "time" },
    { name: "description", label: "Description of Incident", type: "text" },
    { name: "impact", label: "Impact on You / Household", type: "text" },
    {
      name: "reportedTo",
      label: "Police involvement?",
      type: "text",
    },
    { name: "referenceNo", label: "Police Reference No.", type: "text" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto w-full"
    >
      <h1 className="text-2xl  mb-4  text-center">
        <span className="text-red-700 font-bold">Flat 4</span>
      </h1>
      <h2 className="text-xl font-bold mb-4 text-center">
        Incident Report Form
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ name, label, type }) => (
          <div key={name} className="flex flex-col">
            <label className="block font-medium text-sm mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              onKeyDown={name === "flatNumber" ? handleKeyDown : undefined}
              inputMode={name === "flatNumber" ? "numeric" : undefined}
              pattern={name === "flatNumber" ? "[0-9]*" : undefined}
              required={[
                "name",
                "email",
                "flatNumber",
                "date",
                "time",
                "description",
              ].includes(name)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
