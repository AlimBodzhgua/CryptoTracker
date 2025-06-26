import {
	CSSProperties,
	InputHTMLAttributes,
	ReactElement,
	ReactNode,
	forwardRef,
} from 'react';
import { useFocus } from 'shared/hooks/useFocus';
import classnames from 'classnames';
import classes from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	addonBefore?: ReactNode | ReactElement;
	addonAfter?: ReactNode | ReactElement;
	className?: string;
	fieldClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		className,
		addonBefore,
		addonAfter,
		fieldClassName,
		...otherProps
	} = props;
	const [isFocused, focusProps] = useFocus();

	const style: CSSProperties = {
		backgroundColor: isFocused ? '#717171' : '#454545',
	};

	return (
		<div
			className={classnames(classes.Input, className)}
			style={style}
			data-testid='inputWrapper'
		>
			{addonBefore}
			<input
				className={classnames(classes.InputField, fieldClassName)}
				ref={ref}
				data-testid='inputField'
				{...otherProps}
				{...focusProps}
			/>
			{addonAfter}
		</div>
	);
});
