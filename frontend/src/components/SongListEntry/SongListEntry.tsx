import React from 'react';
import { Song } from '../../shared/types';
import './SongListEntry.scss';

interface SongListEntryProps {
  song: Song;
  onSelect: () => void;
  onAddToPlaylist: (song: Song) => void;
}

function SongListEntry({ song, onSelect, onAddToPlaylist }: SongListEntryProps) {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleSongClick = () => {
    if (isLoggedIn) {
      onSelect();
    } else {
      alert('Please log in to listen to music.');
    }
  };

  return (
    <div className="song-list-entry" onClick={handleSongClick}>
      <img
        className="album-art"
        src={"http://localhost:8000/api/static/" + song.album_art_path}
        alt={song.title}
      />
      <div className='song-title'>{song.title}</div>
      <div className='song-artist'>{song.artist}</div>
      <a
        className='add-to-playlist'
        onClick={(e) => {
          e.stopPropagation();
          onAddToPlaylist(song);
        }}
      >
        Add to Playlist
      </a>
    </div>
  );
}

export default SongListEntry;
