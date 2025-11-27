export default function InsightsPanel({ insights }) {
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      <h3 className="font-semibold mb-2">Auto Insights</h3>

      <ul className="space-y-1">
        {insights.map((i, idx) => (
          <li key={idx} className="text-sm">• {i}</li>
        ))}
      </ul>
    </div>
  );
}
