import { MutableRefObject, useRef, useEffect } from 'react';

export interface useInfiniteScrollOptions {
	wrapperRef: MutableRefObject<HTMLDivElement>;
	triggerRef: MutableRefObject<HTMLDivElement>;
	callback?: () => void;
}

export const useInfiniteScroll = (options: useInfiniteScrollOptions) => {
    const { triggerRef, wrapperRef, callback } = options;
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
	        const options = {
	            root: wrapperElement,
	            rootMargin: '0px',
	            threshold: 1.0,
	        };

	        observer.current = new IntersectionObserver(([entry]) => {
	            if (entry.isIntersecting) {
	                callback();
	            }
	        }, options);

	        observer.current.observe(triggerElement);
        }

        return () => {
        	if (observer.current && triggerElement) {
	            observer.current?.unobserve(triggerElement);
	        }
        };
    }, [triggerRef, wrapperRef]);
};
