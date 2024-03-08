import React, {
    CSSProperties,
    InputHTMLAttributes,
    ReactElement,
    ReactNode,
} from 'react';
import classnames from 'classnames';
import { useFocus } from 'hooks/useFocus';
import classes from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	addonBefore?: ReactNode | ReactElement;
	addonAfter?: ReactNode | ReactElement;
	className?: string;
}

export const Input: React.FC<InputProps> = (props) => {
    const [isFocused, focusProps] = useFocus();
    const {
        className,
        addonBefore,
        addonAfter,
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
                {...focusProps}
                {...otherProps}
            />
            {addonAfter}
        </div>
    );
};
