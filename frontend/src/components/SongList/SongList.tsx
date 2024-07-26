import React from 'react';
import SongListEntry from '../SongListEntry/SongListEntry';

type Song = {
  title: string;
  artist: string;
  album_art_path: string;
  song_path: string;
};

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
