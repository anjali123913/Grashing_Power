import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function TrendsChart({ data }) {
  const formatted = data.map((d) => ({
    time: new Date(d.ts).toLocaleTimeString(),
    kw: d.kw,
  }));

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" minTickGap={30} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="kw" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
