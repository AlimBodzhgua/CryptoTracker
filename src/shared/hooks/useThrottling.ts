import { useCallback, useRef } from 'react';
import { setTimeout } from 'timers';

export const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
	const throttleRef = useRef(false);

	return useCallback((...args: any[]) => {
		if (!throttleRef.current) {
			callback(...args);
			throttleRef.current = true;

			setTimeout(() => {
				throttleRef.current = false;
			}, delay);
		}
	}, [callback, delay]);
};
