import {
    FC, MutableRefObject, useEffect, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
    TimeChartOptions,
    UTCTimestamp,
    createChart,
    ColorType,
    isUTCTimestamp,
} from 'lightweight-charts';

import classnames from 'classnames';
import classes from './Chart.module.scss';

interface ChartProps {
	sparkline: string[];
	className?: string;
}

export const Chart: FC<ChartProps> = (props) => {
    const { className, sparkline } = props;
    const { t } = useTranslation();
    const chartContainerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        const chartOptions = {
            layout: {
                textColor: 'black',
                background: { type: ColorType.Solid, color: 'white' },
            },
            height: 260,
            width: 500,
            localization: {
            	timeFormatter: (businessDayOrTimestamp) => {
                    if (isUTCTimestamp(businessDayOrTimestamp)) {
                        return new Date(businessDayOrTimestamp).toString();
                    }
                },
            },
        } as TimeChartOptions;
        const chart = createChart(chartContainerRef.current, chartOptions);
        const lineSeries = chart.addLineSeries({ color: '#2962FF' });

        const time = sparkline.map((_, index) => (
            Date.now() - (3600 * (index + 1)) * 1000 as UTCTimestamp
        )).reverse();

        const coinData = sparkline.map((value, index) => ({ time: time[index], value: Number(value) }));

        chart.timeScale().fitContent();

        lineSeries.setData(coinData);

        return () => {
            chart.remove();
        };
    }, [sparkline]);

    return (
        <div className={classnames(classes.Chart, className)}>
            <h1 className={classes.chartTitle}>{t('Last 24 hour chart')}</h1>
            <div ref={chartContainerRef} />
        </div>
    );
};
