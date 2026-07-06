import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { TweetsProvider } from './lib/TweetsContext';

const USERNAME_FALLBACK = 'Ofek';

function App() {
  const [username, setUsername] = useState<string>(() => {
    const savedUser = localStorage.getItem('tweeter_username');
    return savedUser ? savedUser : USERNAME_FALLBACK;
  });
  
  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    localStorage.setItem('tweeter_username', newUsername);
  };

  return (
    <BrowserRouter>
    <TweetsProvider>
      <div>
        <Navbar/>
        <Routes>
          <Route 
            path='/' 
            element={<Home username={username} />}
            />
          <Route 
            path='/profile'
            element={
              <Profile
              currentUsername={username}
              onUsernameChange={handleUsernameChange}
              />
            }  
            />
          </Routes>
        </div>
      </TweetsProvider>
    </BrowserRouter>
  )
}

export default App
