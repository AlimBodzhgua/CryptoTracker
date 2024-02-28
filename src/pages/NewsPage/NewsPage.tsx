import React from 'react';
import classnames from 'classnames';
import classes from './NewsPage.module.scss';

interface NewsPageProps {
	className?: string;
}

const NewsPage: React.FC<NewsPageProps> = ({ className }) => (
    <div className={classnames(classes.NewsPage, className)}>
        NewsPage
    </div>
);

export default NewsPage;
