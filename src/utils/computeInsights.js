export default function computeInsights(data) {
  if (!data.length) return [];

  const out = [];

  // Low PF
  const lowPf = data.filter((d) => d.pf < 0.8);
  if (lowPf.length > 30) out.push("Low Power Factor detected (<0.8).");

  // Idle stretch
  const idle = data.filter((d) => d.state === "IDLE");
  if (idle.length > 60)
    out.push("Device idle for extended period (>60 samples).");

  // Phase imbalance
  const last = data[data.length - 1];
  const currents = [last.ir, last.iy, last.ib];
  const imbalance =
    ((Math.max(...currents) - Math.min(...currents)) /
      (currents.reduce((a, b) => a + b, 0) / 3)) *
    100;
  if (imbalance > 15)
    out.push(`High phase imbalance detected (${imbalance.toFixed(1)}%).`);

  return out;
}
