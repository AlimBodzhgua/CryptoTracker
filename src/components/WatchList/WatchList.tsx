import { FC } from 'react';
import { ICoin } from 'types/coin';
import { selectCoinsError, selectCoinsIsLoading } from 'redux/selectors/coinsSelectors';
import { useAppSelector } from 'hooks/redux';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import { Message } from 'components/UI/Message/Message';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import StarIcon from 'assets/icons/starSelected.svg';
import classnames from 'classnames';
import classes from './WatchList.module.scss';
import { WatchListItem } from './WatchListItem/WatchListItem';

interface WatchListProps {
	coins: ICoin[];
	className?: string;
}

export const WatchList: FC<WatchListProps> = ({ coins, className }) => {
    const { t } = useTranslation();
    const isLoading = useAppSelector(selectCoinsIsLoading);
    const error = useAppSelector(selectCoinsError);
    const navigate = useNavigate();

    const onNavigateToCoinsPage = () => {
        navigate('/coins');
    };

    if (isLoading) {
        return (
            <ul className={classnames(classes.WatchList, className)}>
                <h2 className={classes.title}>{t('Your watchlist Coins.')}</h2>
                {Array(12).fill(0).map((_, index) => (
                    <Skeleton
                        width='100%'
                        height='35px'
                        radius='5px'
                        // eslint-disable-next-line
						key={index}
                        className={classes.listSkeleton}
                    />
                ))}
            </ul>
        );
    }

    if (error) {
        return (
            <Message
                type='error'
                text={t('Error fetcthing watchlist coins.')}
                withIcon
            />
        );
    }

    return (
        <ul className={classnames(classes.WatchList, className)}>
            {coins.length
                ? (
                    <>
                        <h2 className={classes.title}>{t('Your watchlist coins.')}</h2>
                        {coins.map((coin) => <WatchListItem coin={coin} key={coin.uuid} />)}
                    </>
                ) : (
                    <div className={classes.emptyMessage}>
                        <div className={classes.iconWrapper}>
                            <StarIcon className={classes.starIcon} />
                        </div>
                        <h3 className={classes.emptyTitle}>
                            {t('Your watchlist is empty.')}
                        </h3>
                        <h4 className={classes.emptySubtitle}>
                            {t('You can add coins to watchlist on coins page.')}
                        </h4>
                        <Button
                            onClick={onNavigateToCoinsPage}
                            theme={ButtonTheme.secondary}
                        >
                            {t('Add coins')}
                        </Button>
                    </div>
                )}
        </ul>
    );
};
