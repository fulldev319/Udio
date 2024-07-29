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
        alt={`${props.song.title} album art`}
      />
      <div className="song-title">{props.song.title}</div>
      <div className="song-artist">{props.song.artist}</div>
      <a
        className="add-to-playlist"
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
