import { useEffect } from 'react';

/**
 * Custom hook to override the global ResizeObserver with a debounced version.
 * This is useful to prevent excessive callback executions during rapid resize events.
 * 
 * @param {number} delay - The debounce delay in milliseconds.
 */
const useDebouncedResizeObserver = (delay = 20) => {
    useEffect(() => {
        const debounce = (func, delay) => {
            let timeout;
            return function (...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), delay);
            };
        };

        // Store the original ResizeObserver
        const OriginalResizeObserver = window.ResizeObserver;

        // Override the global ResizeObserver with a debounced version
        window.ResizeObserver = class DebouncedResizeObserver extends OriginalResizeObserver {
            constructor(callback) {
                super(debounce(callback, delay));
            }
        };

        // Cleanup: Restore the original ResizeObserver on unmount
        return () => {
            window.ResizeObserver = OriginalResizeObserver;
        };
    }, [delay]);
};

export default useDebouncedResizeObserver;
