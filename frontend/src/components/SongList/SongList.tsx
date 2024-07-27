import React from 'react';
import SongListEntry from '../SongListEntry/SongListEntry';
import { Song } from '../../shared/types';
import './SongList.scss';

function SongList(props: { songs: Song[]; onSelect: (which: number) => void }) {
  return (
    <div className="song-list">
      {props.songs.map((song, i) => (
        <SongListEntry key={`${i}-${song.song_path}`} song={song} onSelect={() => props.onSelect(i)} />
      ))}
    </div>
  );
}

export default SongList;
