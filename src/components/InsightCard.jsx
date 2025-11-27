// components/InsightCard.jsx
export function InsightCard({ title, desc }) {
return (
<div className="bg-blue-50 p-4 rounded-xl border shadow">
<h4 className="font-bold">{title}</h4>
<p className="text-gray-700 text-sm mt-1">{desc}</p>
</div>
);
}
