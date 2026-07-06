import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Tweet } from './types';
import { fetchTweets, createTweetOnServer } from './api';

interface TweetsContextType {
  tweets: Tweet[];
  isLoading: boolean;
  isSubmitting: boolean;
  error: string;
  addTweet: (content: string, username: string, onSuccess: () => void) => Promise<void>;
  clearError: () => void;
}

const TweetsContext = createContext<TweetsContextType | undefined>(undefined);

export const TweetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const loadTweets = async (showLoading = false) => {
        try {
            if (showLoading) setIsLoading(true);
            const data = await fetchTweets();
            setTweets(data);
        } 
        catch (err) {
            setError('Could not update tweets from server.');
        } 
        finally {
            if (showLoading) setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTweets(true);

        const intervalId = setInterval(() => {
            loadTweets(false);
        }, 10000); 

        return () => clearInterval(intervalId);
    }, []);

    const addTweet = async (
        content: string, 
        username: string, 
        onSuccess: () => void
    ) => {
        setError('');
        setIsSubmitting(true);

        const newTweetData: Omit<Tweet, 'id'> = {
            userName: username,
            content: content,
            date: new Date().toISOString(),
        };

        try {
            await createTweetOnServer(newTweetData);
            onSuccess();

            const createdTweet: Tweet = {
                id: crypto.randomUUID(),
                ...newTweetData
            };

            setTweets((prevTweets) => [
                createdTweet, 
                ...prevTweets
            ]);
        } 
        catch (err: any) {
            setError(err.message || 'Failed to submit tweet.');
        } 
        finally {
            setIsSubmitting(false);
        }
    };

    const clearError = () => setError('');

    return (
        <TweetsContext.Provider 
            value={{ 
                tweets, 
                isLoading, 
                isSubmitting, 
                error, 
                addTweet, 
                clearError 
            }}
        >
            {children}
        </TweetsContext.Provider>
    );
};

    export const useTweets = () => {
        const context = useContext(TweetsContext);
        if (!context) {
            throw new Error('useTweets must be used within a TweetsProvider');
        }
            
    return context;
};