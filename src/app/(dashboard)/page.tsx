"use client";
import useSWR from "swr";
import { Card } from "@/components/ui/Card";
const fetcher = (url: string) => fetch(url).then((r) => r.json());
export default function Dashboard() {
  const { data } = useSWR("/api/analytics", fetcher);
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <Card title="Total applications">{data?.totalApps ?? 0}</Card>
      <Card title="Response rate">{(((data?.responseRate ?? 0) * 100) as number).toFixed(1)}%</Card>
      <Card title="Offer rate">{(((data?.offerRate ?? 0) * 100) as number).toFixed(1)}%</Card>
    </div>
  );
}
