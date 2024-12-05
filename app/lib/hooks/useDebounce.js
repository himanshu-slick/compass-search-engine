// app/lib/hooks/useDebounce.js
"use client";

import { useEffect, useState } from "react";

export function useDebounce(callback, delay) {
  const [debouncedCallback, setDebouncedCallback] = useState(null);

  useEffect(() => {
    if (debouncedCallback === null) return;

    const handler = setTimeout(() => {
      callback(debouncedCallback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedCallback, delay, callback]);

  return (value) => setDebouncedCallback(value);
}
