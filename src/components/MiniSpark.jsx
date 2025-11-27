import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function MiniSpark({ title, data, series }) {
  const rows = data.map((d) => ({
    ts: new Date(d.ts).toLocaleTimeString(),
    ...d,
  }));

  const colors = ["#3b82f6", "#ef4444", "#22c55e"];

  return (
    <div className="mt-4">
      <h3 className="font-medium text-sm mb-1">{title}</h3>

      <div style={{ width: "100%", height: 60 }}>
        <ResponsiveContainer>
          <LineChart data={rows}>
            {series.map((s, i) => (
              <Line
                key={s}
                type="monotone"
                dataKey={s}
                stroke={colors[i]}
                strokeWidth={1}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
