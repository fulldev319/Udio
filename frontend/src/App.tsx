import React, { useState, useEffect } from 'react';
import { SongList, PlayBar, Header } from './components';
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
    <div className="App">
      <div className="main-section">
        <Header onSearch={fetchSongs} />
        <SongList songs={songs} onSelect={(i) => setSelectedSong(i)} onAddToPlaylist={handleAddToPlaylist} />
      </div>
      {selectedSong === null ? "" : <PlayBar song={songs[selectedSong]} />}
    </div>
  );
}

export default App;
