import { useEffect } from "react";

/**
 * Debounce a callback whenever dependencies change
 * @param callback - Function to execute after the delay
 * @param delay - Delay in ms
 * @param dependencies - Dependency array to watch
 */
export function useDebouncedCallback(
  callback: () => void,
  delay: number,
  dependencies: any[]
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...dependencies]);
}
