import type { Tweet } from '../lib/types';

let mockTweets: Tweet[] = [
  { 
    id: '1', 
    userName: 'yonatan', 
    content: 'Hello everyone! The real server is currently undergoing maintenance, so this is a local mock tweet.', 
    date: new Date('2026-07-06T10:00:00.000Z').toISOString() 
  },
  { 
    id: '2', 
    userName: 'Ofek', 
    content: 'Working on Step 3 of Tweeter 2.0! Routing and Profile page are coming along nicely.', 
    date: new Date('2026-07-06T12:30:00.000Z').toISOString() 
  }
];


export const fetchMockTweets = async (): Promise<Tweet[]> => {
  return [...mockTweets].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const createMockTweet = async (tweetData: Omit<Tweet, 'id'>): Promise<boolean> => {
  const newTweet: Tweet = {
    id: crypto.randomUUID(),
    ...tweetData
  };
  
  mockTweets.push(newTweet);
  return true;
};