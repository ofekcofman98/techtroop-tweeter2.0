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
        <div style={{ 
            maxWidth: '600px', 
            margin: '40px auto', 
            padding: '0 20px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            color: '#ffffff' 
        }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>Profile</h1>

            <form 
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
                <label id='text' style={{ color: '#8899a6', fontSize: '14px' }}>User Name</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                            padding: '12px',
                            backgroundColor: 'transparent',
                            border: '1px solid #38444d',
                            borderRadius: '4px',
                            color: '#ffffff',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1d9bf0'}
                    onBlur={(e) => e.target.style.borderColor = '#38444d'}
                />
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: '8px'
                }}>
                    {isSaved && (
                        <span style={{ color: '#00ba7c', fontSize: '14px', fontWeight: '500' }}>
                            Username updated successfully!
                        </span>
                    )}
                    <button
                        type='submit'
                        style={{
                            backgroundColor: '#1d9bf0',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a8cd8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1d9bf0'}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
