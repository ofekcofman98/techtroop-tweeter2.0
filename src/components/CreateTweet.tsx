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
        <form onSubmit={handleSubmit}>
            <textarea 
                placeholder='What you have in mind...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
            />
            <div>
                {isOverLimit && (
                    <div>
                        The tweet can't contain more then {contentLimit} chars. 
                    </div>
                )}

                <button
                    type='submit'
                    disabled={isButtonDisabled}
                >
                    {isSubmitting ? 'Sending...' : 'Tweet'}
                </button>
            </div>
        </form>
    )
};