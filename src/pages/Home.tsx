import React, { useState, useEffect } from 'react';
import { CreateTweet } from '../components/CreateTweet';
import { TweetCard } from '../components/TweetCard';
import type { Tweet } from '../lib/types';

const HARDCODED_USER = "Ofek";

export const Home: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>(() => {
    const savedTweets = localStorage.getItem('tweets');
    return savedTweets ? JSON.parse(savedTweets) : [];
  });

  useEffect(() => {
    localStorage.setItem('tweets', JSON.stringify(tweets));
  }, [tweets])

  const handleAddTweet = (content: string) => {
    const newTweet: Tweet = {
        id: crypto.randomUUID(),
        userName: HARDCODED_USER,
        content: content,
        createdAt: new Date().toISOString()
    };

    setTweets((prevTweets) => [
        ...prevTweets,
        newTweet
        ]);
    }

    return (
        <div>
            <CreateTweet onTweetSubmit={handleAddTweet} />
            <div>
                {tweets.map((tweet) => (
                    <TweetCard 
                    key={tweet.id}
                    tweet={tweet}
                    />
                ))}
            </div>
        </div>
    )

};