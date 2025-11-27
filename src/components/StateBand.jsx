import React from "react";

export default function StateBand({ data }) {
  return (
    <div className="flex w-full h-4 mt-2 rounded overflow-hidden">
      {data.map((d, i) => (
        <div
          key={i}
          className="h-full"
          style={{
            width: `${100 / data.length}%`,
            background:
              d.state === "RUN"
                ? "#22c55e"
                : d.state === "IDLE"
                ? "#facc15"
                : "#ef4444",
          }}
        ></div>
      ))}
    </div>
  );
}
