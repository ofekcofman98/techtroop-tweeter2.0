import React from 'react';
import type { Tweet } from '../lib/types';

interface TweetCardProps {
  tweet: Tweet;
}

export const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
    return (
        <div className='tweet-card'>
            <div className='tweet-card-header'>
                <span className='tweet-username'>{tweet.userName}</span>
                <span className='tweet-date'>{tweet.date? new Date(tweet.date).toLocaleString() : ''}</span>
            </div>
            <p className='tweet-content'>
                {tweet.content}
            </p>
        </div>
    );
};