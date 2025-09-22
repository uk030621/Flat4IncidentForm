"use client";
import { useState, useEffect } from "react";

export default function IncidentTable() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch("/api/incidents")
      .then((res) => res.json())
      .then(setIncidents);
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/incidents/${id}`, { method: "DELETE" });
    setIncidents(incidents.filter((i) => i._id !== id));
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="max-w-6xl mx-auto w-full">
      <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
        Total Incidents:{" "}
        <span className="font-semibold">{incidents.length}</span>
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Name
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Email
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Flat No.
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Date
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Time
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Description
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Impact
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Reported To
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Reference No.
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr
                key={i._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {i.name}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {i.email}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {i.flatNumber}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {formatDate(i.date)}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {i.time}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {i.description}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {i.impact}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {i.reportedTo}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {i.referenceNo}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => handleDelete(i._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
