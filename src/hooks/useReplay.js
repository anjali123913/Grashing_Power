// src/hooks/useReplay.js
import { useEffect, useState, useRef } from "react";

export function useReplay(records) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playIdx, setPlayIdx] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying && records.length > 0) {
      intervalRef.current = setInterval(() => {
        setPlayIdx(i => (i + 1) % records.length);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, records]);

  return {
    isPlaying,
    playIdx,
    setIsPlaying,
    setPlayIdx
  };
}
