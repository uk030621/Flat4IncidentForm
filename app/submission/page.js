"use client";
import IncidentForm from "../../components/IncidentForm";

export default function SubmissionPage() {
  const handleSubmit = async (formData) => {
    await fetch("/api/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("Thank You. Incident Report Successfully submitted!");
  };

  return (
    <div className="p-6">
      {/*<h1 className="text-2xl text-red-700  font-bold mb-4 ml-6">
        Flat 4 Incident Report
      </h1>*/}
      <IncidentForm onSubmit={handleSubmit} />
    </div>
  );
}
