import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import classes from './Skeleton.module.scss';

interface SkeletonProps {
	width?: number | string;
	height?: number | string;
	radius?: string;
	className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = (props) => {
    const {
        width,
        height,
        radius,
        className,
    } = props;

    const style: CSSProperties = {
        width,
        height,
        borderRadius: radius,
    };

    return (
        <div
            className={classnames(classes.Skeleton, className)}
            style={style}
        />
    );
};
