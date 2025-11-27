import React, { useState, useEffect, useMemo } from "react";
import { KPICard } from "../components/KPICard";
import { StreamStatus } from "../components/StreamStatus";
import ReplayControls from "../components/ReplayControls";
import RecordsTable from "../components/RecordsTable";
import TrendsChart from "../components/TrendsChart";
import StateBand from "../components/StateBand";
import MiniSpark from "../components/MiniSpark";
import GapBadge from "../components/GapBadge";
import InsightsPanel from "../components/InsightsPanel";

import { useDeviceStream } from "../hooks/useDeviceStream";
import { useReplay } from "../hooks/useReplay";
import { computeKPIs } from "../utils/computeKPIs";
import computeInsights from "../utils/computeInsights";
import { exportCsv } from "../utils/exportCsv";

// Load JSONL file
async function loadJsonl(path) {
  const res = await fetch(path);
  const text = await res.text();
  return text.trim().split("\n").map((line) => JSON.parse(line));
}

export default function Dashboard() {
  const [mode, setMode] = useState("replay");
  const [replayRecords, setReplayRecords] = useState([]);

  // Live Mode
  const { connected, records: liveData, lastTsGap } = useDeviceStream(
    mode === "live" ? "http://localhost:8080/stream" : null
  );

  // Replay Mode
  const { isPlaying, playIdx, setIsPlaying, setPlayIdx } =
    useReplay(replayRecords);

  useEffect(() => {
    if (mode === "replay") {
      loadJsonl("/public/device_stream_20min.jsonl").then(setReplayRecords);
    }
  }, [mode]);

  const displayRecords =
    mode === "live" ? liveData : replayRecords.slice(0, playIdx + 1);

  // KPIs
  const kpis = useMemo(
    () => computeKPIs(displayRecords),
    [displayRecords]
  );

  // Insights
  const insights = useMemo(
    () => computeInsights(displayRecords),
    [displayRecords]
  );

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">LimelightIT — Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => exportCsv(displayRecords)}
            className="px-3 py-1 border rounded bg-gray-50"
          >
            Export CSV
          </button>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="replay">Replay</option>
            <option value="live">Live</option>
          </select>
        </div>
      </header>

      <GapBadge gapSec={lastTsGap} />

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <section className="bg-white rounded-2xl shadow-sm p-4">
          <StreamStatus connected={connected} />

          <div className="grid grid-cols-2 gap-3">
            <KPICard label="Avg kW" value={`${kpis.avgKw} kW`} />
            <KPICard label="Energy (kWh)" value={kpis.energy} />
            <KPICard label="PF (avg)" value={kpis.pfAvg} />
            <KPICard label="Uptime %" value={kpis.uptimePct} />
            <KPICard label="Idle %" value={kpis.idlePct} />
            <KPICard label="Off %" value={kpis.offPct} />
            <KPICard label="Throughput (units/min)" value={kpis.throughput} />
            <KPICard label="Phase Imbalance %" value={kpis.phaseImbalance} />
          </div>

          <ReplayControls
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onReset={() => {
              setPlayIdx(0);
              setIsPlaying(false);
            }}
          />

          <MiniSpark
            title="Current (A)"
            series={["ir", "iy", "ib"]}
            data={displayRecords}
          />

          <MiniSpark
            title="Voltage (V)"
            series={["vr", "vy", "vb"]}
            data={displayRecords}
          />
        </section>

        {/* Right Panel */}
        <section className="col-span-2 bg-white rounded-2xl shadow-sm p-4">
          <TrendsChart data={displayRecords} />
          <StateBand data={displayRecords} />
          <InsightsPanel insights={insights} />
          <RecordsTable records={displayRecords} />
        </section>
      </main>
    </div>
  );
}
