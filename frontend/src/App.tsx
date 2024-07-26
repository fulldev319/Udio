import React from 'react';
import { SongList, PlayBar, Header } from './components';
import './App.scss';

type Song = {
  title: string;
  artist: string;
  album_art_path: string;
  song_path: string;
};

function App() {
  const [selectedSong, setSelectedSong] = React.useState<number | null>(null);
  const [songs, setSongs] = React.useState<Song[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:8000/api/all_songs", {})
      .then((resp) => resp.json())
      .then((songs) => {
        setSongs(songs.songs);
      });
  }, []);

  return (
    <div className="App">
      <div className="main-section">
        <Header />
        <SongList
          songs={songs}
          onSelect={(idx) => setSelectedSong(idx)}
        />
      </div>
      {selectedSong === null ? "" : <PlayBar song={songs[selectedSong]} />}
    </div>
  );
}

export default App;
