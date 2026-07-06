import React, { useState, useEffect, use } from 'react';
import { CreateTweet } from '../components/CreateTweet';
import { TweetCard } from '../components/TweetCard';
import type { Tweet } from '../lib/types';
import { createTweetOnServer, fetchTweets } from '../lib/api';

interface HomeProps {
  username: string;
}

export const Home: React.FC<HomeProps> = ({ username }) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const loadTweets = async () => {
        try {
            setIsLoading(true);
            const data = await fetchTweets();
            setTweets(data);
        }
        catch (err) {
            setError('Could not load tweets from server.');
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadTweets();
    }, [])

    
    const handleAddTweet = async (
        content: string, 
        onSuccess: () => void
    ) => {
        setError("");
        setIsSubmitting(true);

        const newTweet: Tweet = {
            id: crypto.randomUUID(),
            userName: username,
            content: content,
            date: new Date().toISOString()
        };

        try {
            await createTweetOnServer(newTweet);
            onSuccess();

            await loadTweets();
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to submit tweet.");
            }
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='home'>
            {error && (
                <div className='tweet-error'>
                    {error}
                </div>
            )}

            <CreateTweet
                onTweetSubmit={handleAddTweet}
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