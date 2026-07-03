import React, { useState } from 'react';

interface ProfileProps {
    currentUsername: string;
    onUsernameChange: (newUsername: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ currentUsername, onUsernameChange }) => {
    const [username, setUsername] = useState<string>(currentUsername);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onUsernameChange(username.trim());
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        }
    };

    return (
        <div>
            <h1>Profile</h1>

            <form onSubmit={handleSubmit}>
                <label id='text'>User Name</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div>
                    {isSaved && 
                        (<span>
                            Username updated successfully!
                        </span>
                    )}
                    <button
                        type='submit'
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
