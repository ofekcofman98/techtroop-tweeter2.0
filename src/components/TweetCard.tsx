import React from 'react';
import type { Tweet } from '../lib/types';

interface TweetCardProps {
  tweet: Tweet;
}

export const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
    return (
        <div>
            <div>
                <span>{tweet.userName}</span>
                <span>{tweet.createdAt}</span>
            </div>
            <p>
                {tweet.content}
            </p>
        </div>
    );
};