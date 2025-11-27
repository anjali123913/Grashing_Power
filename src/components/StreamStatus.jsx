
// components/StreamStatus.jsx
export function StreamStatus({ connected }) {
return (
<div className="text-sm mb-3">
{connected ? (
<span className="text-green-600">● Live stream connected</span>
) : (
<span className="text-red-600">● Waiting for stream…</span>
)}
</div>
);
}