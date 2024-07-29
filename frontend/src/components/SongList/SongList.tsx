import React from 'react';
import SongListEntry from '../SongListEntry/SongListEntry';
import { Song } from '../../shared/types';
import './SongList.scss';

interface SongListProps {
  songs: Song[];
  onSelect: (which: number) => void;
  onAddToPlaylist: (song: Song) => void;
}


function SongList({ songs, onSelect, onAddToPlaylist }: SongListProps) {
  return (
    <div className="song-list">
      {songs.map((song, i) => (
        <SongListEntry
          key={`${i}-${song.song_path}`}
          song={song}
          onSelect={() => onSelect(i)}
          onAddToPlaylist={onAddToPlaylist}
        />
      ))}
    </div>
  );
}

export default SongList;
