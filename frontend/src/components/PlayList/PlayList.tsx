import React from 'react';
import { Song } from '../../shared/types';
import './PlayList.scss';

interface PlaylistProps {
  songs: Song[];
  onSelect: (song: Song) => void;
  onRemove: (song: Song) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ songs, onSelect, onRemove }) => {
  return (
    <div className="playlist">
      <h3>Playlist</h3>
      {songs.map((song, index) => (
        <div key={index} className="playlist-entry">
          <div className="song-info" onClick={() => onSelect(song)}>
            <img
              className="album-art"
              src={"http://localhost:8000/api/static/" + song.album_art_path}
              alt={song.title}
            />
            <div className='song-title'>{song.title}</div>
            <div className='song-artist'>{song.artist}</div>
          </div>
          <button
            className="remove-button"
            onClick={() => onRemove(song)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
