import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SongList, PlayBar, Header, PlayList } from './components';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import { Song } from './shared/types';
import './App.scss';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState<Song[]>([]);

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
    setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
  };

  const handleRemoveFromPlaylist = (song: Song) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((s) => s.id !== song.id));
  };

  const handleSelectSong = (index: number) => {
    setSelectedSong(index);
  };

  const handleSelectPlaylistSong = (song: Song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    setSelectedSong(index);
  };

  return (
    <Router>
      <div className="App">
        <Header onSearch={fetchSongs} />
        <Routes>
          <Route path="/" element={
            <div className="main-section">
              <SongList songs={songs} onSelect={handleSelectSong} onAddToPlaylist={handleAddToPlaylist} />
              {isLoggedIn && selectedSong !== null ? <PlayBar song={songs[selectedSong]} /> : null}
              {playlist.length > 0 && <PlayList songs={playlist} onSelect={handleSelectPlaylistSong} onRemove={handleRemoveFromPlaylist} />}
            </div>
          } />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
