import React from "react";

export default function GapBadge({ gapSec }) {
  if (!gapSec || gapSec < 10) return null;

  return (
    <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded">
      ⚠️ No data received for {gapSec}s
    </div>
  );
}
