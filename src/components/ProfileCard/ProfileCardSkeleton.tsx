import { FC, memo } from 'react';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import classnames from 'classnames';
import classes from './ProfileCard.module.scss';

interface ProfileCardSkeletonProps {
	className?: string;
}

export const ProfileCardSkeleton: FC<ProfileCardSkeletonProps> = memo(
	(props) => {
		const { className } = props;

		return (
			<div className={classnames(classes.ProfileCard, className)}>
				<Skeleton
					width='185px'
					height='205px'
					radius='5px'
					className={classes.profileImage}
				/>
				<div className={classes.data}>
					<div className={classes.dataWrapper}>
						<div className={classes.dataItem}>
							<span className={classes.dataText}>Id</span>
							<Skeleton width='220px' height='45px' radius='5px' />
						</div>
						<div className={classes.dataItem}>
							<span className={classes.dataText}>Email</span>
							<Skeleton width='220px' height='45px' radius='5px' />
						</div>
					</div>
					<div className={classes.dataWrapper}>
						<div className={classes.dataItem}>
							<span className={classes.dataText}>Login</span>
							<Skeleton width='220px' height='45px' radius='5px' />
						</div>
						<div className={classes.dataItem}>
							<span className={classes.dataText}>Image Url</span>
							<Skeleton width='220px' height='45px' radius='5px' />
						</div>
					</div>
				</div>
			</div>
		);
	},
);
