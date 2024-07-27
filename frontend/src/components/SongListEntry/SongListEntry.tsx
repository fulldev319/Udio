import React from 'react';
import NotImplemented from '../NotImplemented/NotImplemented';
import { Song } from '../../shared/types';
import './SongListEntry.scss';

function SongListEntry(props: { song: Song; onSelect: () => void }) {
  return (
    <div className="song-list-entry" onClick={props.onSelect}>
      <img
        className="album-art"
        src={"http://localhost:8000/api/static/" + props.song.album_art_path}
      />
      <div>{props.song.title}</div>
      <div>{props.song.artist}</div>
      <a
        onClick={(e) => {
          NotImplemented();
          e.stopPropagation();
        }}
      >
        Add to Playlist
      </a>
    </div>
  );
}

export default SongListEntry;
