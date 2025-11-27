// src/components/ReplayControls.jsx
export default function ReplayControls({ isPlaying, onPlay, onPause, onReset }) {
  return (
    <div className="mt-4">
      <h3 className="font-medium">Replay Controls</h3>
      <div className="flex gap-2 mt-2">
        <button onClick={onPlay} className="px-3 py-1 bg-indigo-600 text-white rounded">
          Play
        </button>
        <button onClick={onPause} className="px-3 py-1 border rounded">
          Pause
        </button>
        <button onClick={onReset} className="px-3 py-1 border rounded">
          Reset
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Replay loads public/device_stream_20min.jsonl</p>
    </div>
  );
}
