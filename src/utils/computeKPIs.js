export function computeKPIs(data) {
  if (!data.length) {
    return {
      avgKw: "-",
      energy: "-",
      pfAvg: "-",
      uptimePct: "-",
      idlePct: "-",
      offPct: "-",
      throughput: "-",
      phaseImbalance: "-",
    };
  }

  const kw = data.map((d) => d.kw).filter(Number.isFinite);
  const avgKw = (kw.reduce((a, b) => a + b, 0) / kw.length).toFixed(3);

  const energy = (
    Math.max(...data.map((d) => d.kwh_total)) -
    Math.min(...data.map((d) => d.kwh_total))
  ).toFixed(3);

  const pfVals = data
    .filter((d) => d.state !== "OFF")
    .map((d) => d.pf)
    .filter(Number.isFinite);
  const pfAvg = (pfVals.reduce((a, b) => a + b, 0) / pfVals.length).toFixed(3);

  // State % (duration-based)
  const total = data.length;
  const uptimePct = (
    (data.filter((d) => d.state === "RUN").length / total) *
    100
  ).toFixed(1);
  const idlePct = (
    (data.filter((d) => d.state === "IDLE").length / total) *
    100
  ).toFixed(1);
  const offPct = (
    (data.filter((d) => d.state === "OFF").length / total) *
    100
  ).toFixed(1);

  // Throughput
  const deltaCount =
    data[data.length - 1].count_total - data[0].count_total;
  const minutes =
    (new Date(data[data.length - 1].ts) - new Date(data[0].ts)) / 60000;
  const throughput = minutes > 0 ? (deltaCount / minutes).toFixed(2) : "-";

  // Phase imbalance
  const last = data[data.length - 1];
  const currents = [last.ir, last.iy, last.ib];
  const avg = currents.reduce((a, b) => a + b, 0) / 3;
  const phaseImbalance =
    (((Math.max(...currents) - Math.min(...currents)) / avg) * 100).toFixed(1);

  return {
    avgKw,
    energy,
    pfAvg,
    uptimePct,
    idlePct,
    offPct,
    throughput,
    phaseImbalance,
  };
}
