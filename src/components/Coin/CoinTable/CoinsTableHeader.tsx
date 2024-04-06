import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TriangleSorter } from 'components/TriangleSorter/TriangleSorter';
import { FieldNameType } from 'types/coin';

import classnames from 'classnames';
import classes from './CoinTable.module.scss';

interface CoinsTableHeaderProps {
	className?: string;
}

export const CoinsTableHeader: FC<CoinsTableHeaderProps> = ({ className }) => {
    const { t } = useTranslation();
    const [activeTriangle, setActiveTriangle] = useState<FieldNameType>('rank');

    return (
        <thead className={classnames(classes.header, className)}>
            <tr className={classes.row}>
                <th className={classes.colHeader}>
                    <div className={classes.headerItem}>
                        <span>#</span>
                        <TriangleSorter
                            sortField='rank'
                            activeTriangle={activeTriangle}
                            setActiveTriangle={setActiveTriangle}
                        />
                    </div>
                </th>
                <th className={classes.colHeader}>
                    <div
                        className={classnames(
                            classes.headerItem,
                            classes.firstColumn,
                        )}
                    >
                        <span>{t('Name')}</span>
                        <TriangleSorter
                            sortField='name'
                            activeTriangle={activeTriangle}
                            setActiveTriangle={setActiveTriangle}
                        />
                    </div>
                </th>
                <th className={classes.colHeader}>
                    <div className={classes.headerItem}>
                        <span>{t('Price')}</span>
                        <TriangleSorter
                            sortField='price'
                            activeTriangle={activeTriangle}
                            setActiveTriangle={setActiveTriangle}
                        />
                    </div>
                </th>
                <th className={classes.colHeader}>
                    <div className={classes.headerItem}>
                        <span>{t('Change')}</span>
                        <TriangleSorter
                            sortField='change'
                            activeTriangle={activeTriangle}
                            setActiveTriangle={setActiveTriangle}
                        />
                    </div>
                </th>
                <th className={classes.colHeader}>
                    <div className={classes.headerItem}>
                        <span>{t('24h volume')}</span>
                        <TriangleSorter
                            sortField='24hVolume'
                            activeTriangle={activeTriangle}
                            setActiveTriangle={setActiveTriangle}
                        />
                    </div>
                </th>
                <th className={classes.colHeader}>
                    <div className={classes.headerItem}>
                        <span>{t('Market cap')}</span>
                        <TriangleSorter
                            sortField='marketCap'
                            activeTriangle={activeTriangle}
                            setActiveTriangle={setActiveTriangle}
                        />
                    </div>
                </th>
            </tr>
        </thead>
    );
};
