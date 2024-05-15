import { useState } from 'react';

interface focusProps {
	onFocus: () => void;
	onBlur: () => void;
}

export const useFocus = ():[boolean, focusProps] => {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const focus: focusProps = {
		onFocus: () => setIsFocused(true),
		onBlur: () => setIsFocused(false),
	};

	return [isFocused, focus];
};
