import React, { useState } from 'react';

interface CreateTweetProps {
  onTweetSubmit: (content: string, onSuccess: () => void) => void;
  isSubmitting: boolean;
  contentLimit?: number;
}

export const CreateTweet: React.FC<CreateTweetProps> = ({ onTweetSubmit, isSubmitting, contentLimit = 140 }) => {
    const [content, setContent] = useState('');

    const isOverLimit = content.length > contentLimit;
    const isButtonDisabled = content.trim().length === 0 || isOverLimit || isSubmitting;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isButtonDisabled) {
            onTweetSubmit(content, () => {
                setContent('');
            });
            setContent('');
        }
    };

    return (
        <form className='tweet-form' onSubmit={handleSubmit}>
            <textarea
                className='tweet-textarea'
                placeholder='What you have in mind...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
            />
            <div className='tweet-actions'>
                {isOverLimit && (
                    <div className='tweet-error'>
                        The tweet can't contain more then {contentLimit} chars.
                    </div>
                )}

                <button
                    className='tweet-button'
                    type='submit'
                    disabled={isButtonDisabled}
                >
                    {isSubmitting ? 'Sending...' : 'Tweet'}
                </button>
            </div>
        </form>
    )
};