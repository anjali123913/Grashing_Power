// components/DeviceChart.jsx
import { Line } from "react-chartjs-2";
import {
Chart as ChartJS,
LineElement,
CategoryScale,
LinearScale,
PointElement
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export function DeviceChart({ data, label }) {
return (
<div className="bg-white shadow p-4 rounded-xl border">
<h3 className="font-semibold mb-2">{label}</h3>
<Line
data={{
labels: data.map((d) => d.time),
datasets: [{ data: data.map((d) => d.value) }],
}}
options={{ responsive: true, scales: { y: { beginAtZero: false } } }}
/>
</div>
);
}
