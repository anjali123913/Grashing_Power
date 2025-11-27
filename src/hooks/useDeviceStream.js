// hooks/useDeviceStream.js
import { useEffect, useState } from "react";

export function useDeviceStream() {
const [connected, setConnected] = useState(false);
const [records, setRecords] = useState([]);

useEffect(() => {
const stream = new EventSource("http://localhost:3000/stream");

stream.onopen = () => setConnected(true);
stream.onerror = () => setConnected(false);

stream.onmessage = (e) => {
const data = JSON.parse(e.data);
setRecords((prev) => [...prev.slice(-59), data]);
};

return () => stream.close();
}, []);

return { connected, records };
}
