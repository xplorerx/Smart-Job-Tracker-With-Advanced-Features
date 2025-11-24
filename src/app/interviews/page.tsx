"use client";
import { useState } from "react";

export default function InterviewsPage() {
  const [appId, setAppId] = useState("");
  const [type, setType] = useState("Screen");
  const [date, setDate] = useState("");

  async function add() {
    await fetch("/api/interviews", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ applicationId: appId, type, scheduledAt: date })
    });
    setAppId(""); setType("Screen"); setDate("");
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="border p-2 rounded w-44" placeholder="Application ID" value={appId} onChange={(e) => setAppId(e.target.value)} />
        <input className="border p-2 rounded w-44" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
        <input className="border p-2 rounded w-52" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={add}>Schedule</button>
      </div>
      <p className="text-sm text-gray-600">Enter an existing Application ID from the Applications list.</p>
    </div>
  );
}
