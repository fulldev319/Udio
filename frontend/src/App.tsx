import React, { useState, useEffect, useCallback } from 'react';
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
  const [page, setPage] = useState<number>(1); // Current page
  const [totalPages, setTotalPages] = useState<number>(1); // Total number of pages
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    fetchSongs('', page); // Fetch songs when page changes
  }, [page]);

  const fetchSongs = useCallback((query: string, page: number) => {
    setIsLoading(true); // Set loading state to true
    fetch(`http://localhost:8000/api/fetch_songs?q=${query}&page=${page}&limit=20`)
      .then((resp) => resp.json())
      .then((data) => {
        if (page === 1) {
          setSongs(data.songs); // Replace songs on first page
        } else {
          setSongs((prevSongs) => [...prevSongs, ...data.songs]); // Append songs on subsequent pages
        }
        setTotalPages(data.total_pages);
        setIsLoading(false); // Set loading state to false
      });
  }, []);

  const handleAddToPlaylist = (song: Song) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
  };

  const handleRemoveFromPlaylist = (song: Song) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((s) => s.id !== song.id));
    if (selectedSong !== null && songs[selectedSong].id === song.id) {
      setSelectedSong(null);
    }
  };

  const handleSelectSong = (index: number) => {
    setSelectedSong(index);
  };

  const handleSelectPlaylistSong = (song: Song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    setSelectedSong(index);
  };

  const handleClosePlayBar = () => {
    setSelectedSong(null);
  };

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (page < totalPages && !isLoading) {
        setPage((prevPage) => prevPage + 1); // Load next page
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, page, totalPages, isLoading]);

  const handleSearch = (query: string) => {
    setSelectedSong(null);
    setPage(1); 
    fetchSongs(query, 1);
  }

  return (
    <Router>
      <div className="App">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={
            <div className="main-section">
              <SongList songs={songs} onSelect={handleSelectSong} onAddToPlaylist={handleAddToPlaylist} />
              {isLoggedIn && selectedSong !== null ? <PlayBar song={songs[selectedSong]} onClose={handleClosePlayBar} /> : null}
              {playlist.length > 0 && <PlayList songs={playlist} onSelect={handleSelectPlaylistSong} onRemove={handleRemoveFromPlaylist} />}
              {isLoading && <div className="loading-indicator">Loading...</div>}
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
