"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ApplicationsPage() {
  const { data, mutate } = useSWR("/api/applications", fetcher);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  async function add() {
    await fetch("/api/applications", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        status: "SAVED",
        job: { title },
        company: company ? { name: company } : undefined
      })
    });
    setTitle("");
    setCompany("");
    mutate();
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="border p-2 rounded w-52" placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="border p-2 rounded w-52" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={add}>Add</button>
      </div>
      <ul className="space-y-2">
        {data?.map((a: any) => (
          <li key={a.id} className="border rounded p-3 bg-white">
            <div className="font-medium">{a.job?.title ?? "Untitled"}</div>
            <div className="text-sm text-gray-600">{a.company?.name ?? "—"}</div>
            <div className="text-xs text-gray-500">Status: {a.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
