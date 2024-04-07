import { FC } from 'react';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import classes from './Stats.module.scss';

export const StatsSkeleton: FC = () => (
    <div className={classes.Stats}>
        <div className={classes.data}>
            <div className={classes.dataTitle}>btcDominance</div>
            <Skeleton width='140px' height='22px' radius='6px' />
        </div>
        <div className={classes.data}>
            <div className={classes.dataTitle}>total24hVolume</div>
            <Skeleton width='140px' height='22px' radius='6px' />
        </div>
        <div className={classes.data}>
            <div className={classes.dataTitle}>totalExchanges</div>
            <Skeleton width='140px' height='22px' radius='6px' />
        </div>
        <div className={classes.data}>
            <div className={classes.dataTitle}>totalMarketCap</div>
            <Skeleton width='140px' height='22px' radius='6px' />
        </div>
        <div className={classes.data}>
            <div className={classes.dataTitle}>totalMarkets</div>
            <Skeleton width='140px' height='22px' radius='6px' />
        </div>
        <div className={classes.data}>
            <div className={classes.dataTitle}>totalMarkets</div>
            <Skeleton width='140px' height='22px' radius='6px' />
        </div>
        <div className={classes.listSection}>
            <div className={classes.listWrapper}>
                <Skeleton
                    width='240px'
                    height='32px'
                    radius='6px'
                    className={classes.listSkeleton}
                />
                <Skeleton
                    width='240px'
                    height='32px'
                    radius='6px'
                    className={classes.listSkeleton}
                />
                <Skeleton
                    width='240px'
                    height='32px'
                    radius='6px'
                    className={classes.listSkeleton}
                />
            </div>
            <div className={classes.listWrapper}>
                <Skeleton
                    width='240px'
                    height='32px'
                    radius='6px'
                    className={classes.listSkeleton}
                />
                <Skeleton
                    width='240px'
                    height='32px'
                    radius='6px'
                    className={classes.listSkeleton}
                />
                <Skeleton
                    width='240px'
                    height='32px'
                    radius='6px'
                    className={classes.listSkeleton}
                />
            </div>
        </div>
    </div>
);
