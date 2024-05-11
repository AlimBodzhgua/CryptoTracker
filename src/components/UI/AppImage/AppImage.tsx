import {
	FC,
	memo,
	useLayoutEffect,
	useState,
	ReactElement,
    ImgHTMLAttributes,
} from 'react';


interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt?: string;
	fallback?: ReactElement;
	errorFallback?: ReactElement;
	className?: string;
}

export const AppImage: FC<AppImageProps> = memo((props) => {
	const {
		src,
		fallback,
		errorFallback,
		className,
		alt = 'Image',
		...otherProps
	} = props;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasError, setHasError] = useState<boolean>(false);

	useLayoutEffect(() => {
		const img = new Image();
		img.src = src ?? '';
		
		img.onload = () => {
			setIsLoading(false);
		}

		img.onerror = () => {
			setIsLoading(false);
			setHasError(true);
		}

	}, [])


	if (isLoading && fallback) {
		return fallback;
	}


	if (hasError && errorFallback) {
		return errorFallback;
	}


	return (
		<img
			src={src}
			alt={alt}
			className={className}
			{...otherProps}
		/>
	)
})