// components/KPICard.jsx
export function KPICard({ label, value }) {
return (
<div className="bg-white shadow p-4 rounded-xl border w-full">
<p className="text-gray-500 text-sm">{label}</p>
<h2 className="text-2xl font-bold mt-1">{value}</h2>
</div>
);
}