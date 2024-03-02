import React from 'react';
import { CoinTable } from 'components/Coin/CoinTable/CoinTable';
import { Page } from 'components/UI/Page/Page';
import classnames from 'classnames';
import classes from './CoinsPage.module.scss';

interface CoinsPageProps {
	className?: string;
}

const CoinsPage: React.FC<CoinsPageProps> = ({ className }) => (
    <Page className={classnames(classes.CoinsPage, className)}>
        <CoinTable />
    </Page>
);

export default CoinsPage;
