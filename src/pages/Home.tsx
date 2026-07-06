import React, { useState, useEffect, use } from 'react';
import { CreateTweet } from '../components/CreateTweet';
import { TweetCard } from '../components/TweetCard';
import { useTweets } from '../lib/TweetsContext';

interface HomeProps {
  username: string;
}

export const Home: React.FC<HomeProps> = ({ username }) => {
    const { tweets, isLoading, isSubmitting, error, addTweet, clearError } = useTweets();

    useEffect(() => {
        clearError();
    }, [])

    const handleSubmitTweet = (content: string, onSuccess: () => void) => {
        addTweet(content, username, onSuccess);
    };

    return (
        <div className='home'>
            {error && (
                <div className='tweet-error'>
                    {error}
                </div>
            )}

            <CreateTweet
                onTweetSubmit={handleSubmitTweet}
                isSubmitting={isSubmitting}
            />

            {isLoading ? (
                <div className='loading'>
                    Loading tweets...
                </div>
            ) : (
            <div className='tweet-list'>
                {tweets.map((tweet) => (
                    <TweetCard 
                        key={tweet.id}
                        tweet={tweet}
                    />
                ))}
            </div>
            )}
        </div>
    )

};