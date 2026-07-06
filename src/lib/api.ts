import { createMockTweet, fetchMockTweets } from "../data/mockFallback";
import type { Tweet } from "./types";

const API_URL = 'https://lrazzxpwhdtmxcetgtng.supabase.co/rest/v1/Tweets';
const API_KEY = 'sb_publishable_PYoOQaHg4j7ps7Vo5Br41Q_QfmiyPSB';

const headers = {
    'Content-Type': 'application/json',
    'apikey': API_KEY,
    'Authorization': `Bearer ${API_KEY}`
};

export const fetchTweets = async (): Promise<Tweet[]> => {
    try {

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tweets from server');
        }
        
        const data: Tweet[] = await response.json();   
        return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    catch (err) {
        console.warn("Failed to fetch tweets from server, switching to mock fallback:", err);
        return fetchMockTweets();
    }
};


export const createTweetOnServer = async (tweetData: Omit<Tweet, 'id'>): Promise<boolean> => {
    try {

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(tweetData)
        });
        
        if (!response.ok) {
            throw new Error('Could not save your tweet. Server error.');
        }
        
        return true;
    }
    catch (err) {
        console.warn('Real server failed to post, saving to Mock fallback:', err);
        return createMockTweet(tweetData);
    }
};