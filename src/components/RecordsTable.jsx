// src/components/RecordsTable.jsx
export default function RecordsTable({ records }) {
  return (
    <div className="mt-4">
      <h3 className="font-medium">Last Samples</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th>ts</th><th>kw</th><th>pf</th><th>temp</th><th>alarm</th>
            </tr>
          </thead>

          <tbody>
            {records.slice(-10).reverse().map((d, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-1 pr-4">{d.ts}</td>
                <td className="py-1 pr-4">{d.kw}</td>
                <td className="py-1 pr-4">{d.pf}</td>
                <td className="py-1 pr-4">{d.temp_c}</td>
                <td className="py-1 pr-4">{d.alarm_code ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
