import {
    CSSProperties,
    InputHTMLAttributes,
    ReactElement,
    ReactNode,
    forwardRef,
    memo,
} from 'react';
import { useFocus } from 'hooks/useFocus';
import classnames from 'classnames';
import classes from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	addonBefore?: ReactNode | ReactElement;
	addonAfter?: ReactNode | ReactElement;
	className?: string;
    fieldClassName?: string;
}

export const Input = memo(forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const [isFocused, focusProps] = useFocus();
    const {
        className,
        addonBefore,
        addonAfter,
        fieldClassName,
        ...otherProps
    } = props;

    const style: CSSProperties = {
        backgroundColor: isFocused ? '#717171' : '#454545',
    };

    return (
        <div
            className={classnames(classes.Input, className)}
            style={style}
        >
            {addonBefore}
            <input
                className={classnames(classes.InputField, fieldClassName)}
                ref={ref}
                {...otherProps}
                {...focusProps}
            />
            {addonAfter}
        </div>
    );
}));
