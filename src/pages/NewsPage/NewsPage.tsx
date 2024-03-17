import React, { useEffect } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import classes from './NewsPage.module.scss';

interface NewsPageProps {
	className?: string;
}

const API_KEY = process.env.NEWS_API;

const NewsPage: React.FC<NewsPageProps> = ({ className }) => {
    useEffect(() => {
        console.log(API_KEY);
        const fetchNews = async () => {
            try {
                const data = await axios.get(`https://newsdata.io/api/1/news?apikey=${API_KEY}`);
                console.log(data);
            } catch (e) {
                console.error(e);
            }
        };
        // fetchNews();
    }, []);

    return (
        <div className={classnames(classes.NewsPage, className)}>
            NewsPage
        </div>
    );
};

export default NewsPage;
