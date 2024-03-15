import React, {
    CSSProperties,
    InputHTMLAttributes,
    MutableRefObject,
    ReactElement,
    ReactNode,
    RefObject,
    forwardRef,
    memo,
} from 'react';
import classnames from 'classnames';
import { useFocus } from 'hooks/useFocus';
import classes from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	addonBefore?: ReactNode | ReactElement;
	addonAfter?: ReactNode | ReactElement;
    inputRef?: RefObject<HTMLInputElement>;
	className?: string;
}

export const Input: React.FC<InputProps> = memo(forwardRef((props, ref) => {
    const [isFocused, focusProps] = useFocus();
    const {
        className,
        addonBefore,
        addonAfter,
        inputRef,
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
                className={classes.InputField}
                ref={inputRef}
                {...otherProps}
                {...focusProps}
            />
            {addonAfter}
        </div>
    );
}));
