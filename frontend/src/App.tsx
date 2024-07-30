import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SongList, PlayBar, Header } from './components';
import SignUp from './components/SignUp/SignUp';
import { Song } from './shared/types';
import './App.scss';

function App() {
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetchSongs('');
  }, []);

  const fetchSongs = (query: string) => {
    fetch(`http://localhost:8000/api/fetch_songs?q=${query}`)
      .then((resp) => resp.json())
      .then((data) => {
        setSongs(data.songs);
      });
  };

  const handleAddToPlaylist = (song: Song) => {
    // add to playlist
  };

  return (
    <Router>
      <div className="App">
        <Header onSearch={fetchSongs} />
        <Routes>
          <Route path="/" element={
            <div className="main-section">
              <SongList songs={songs} onSelect={(i) => setSelectedSong(i)} onAddToPlaylist={handleAddToPlaylist} />
              {selectedSong === null ? "" : <PlayBar song={songs[selectedSong]} />}
            </div>
          } />
          <Route path="/signup" element={<SignUp />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
