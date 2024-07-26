import React from "react";
import {
  MdPlayArrow,
  MdPause,
  MdFastForward,
  MdFastRewind,
} from "react-icons/md";

import "./App.scss";

type Song = {
  title: string;
  artist: string;
  album_art_path: string;
  song_path: string;
};

function NotImplemented() {
  window.alert("Not implemented!");
}

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

function SongList(props: { songs: Song[]; onSelect: (which: number) => void }) {
  return (
    <div className="song-list">
      {props.songs.map((song, i) => (
        <SongListEntry key={`${i}-${song.song_path}`} song={song} onSelect={() => props.onSelect(i)} />
      ))}
    </div>
  );
}

function PlayBar(props: { song: Song }) {
  let [playProgress, setPlayProgress] = React.useState<number>(0);
  let [playing, setPlaying] = React.useState<boolean>(false);

  const audioPlayer = React.useRef<HTMLAudioElement | null>(null);
  const seeker = React.useRef<HTMLInputElement>(null);

  let playAnimationRef = React.useRef<number | null>(null);
  const refresh = () => {
    const currentTime = audioPlayer.current!.currentTime;
    const progress = currentTime / audioPlayer.current!.duration;
    setPlayProgress(progress);
    seeker.current!.value = progress.toString();
    playAnimationRef.current! = requestAnimationFrame(refresh);
  };

  React.useEffect(() => {
    if (audioPlayer === null) {
      return;
    }
    if (playing) {
      audioPlayer.current!.play();
      playAnimationRef.current! = requestAnimationFrame(refresh);
    } else {
      audioPlayer.current!.pause();
      cancelAnimationFrame(playAnimationRef.current!);
    }
  });

  const seek = () => {
    let progress = parseFloat(seeker.current!.value);
    if (audioPlayer.current !== null) {
      audioPlayer.current.currentTime =
        progress * audioPlayer.current!.duration;
    }
    setPlayProgress(progress);
  };

  return (
    <div className="play-bar">
      <img
        className="album-art"
        src={"http://localhost:8000/api/static/" + props.song.album_art_path}
      />
      <div className="info-bar">
        <div>{props.song.title}</div>
        <div>{props.song.artist}</div>
        <audio
          ref={audioPlayer}
          src={"http://localhost:8000/api/static/" + props.song.song_path}
          style={{ display: "none" }}
        />
        <input
          type="range"
          ref={seeker}
          value={playProgress}
          min="0"
          max="1"
          step="0.001"
          onChange={() => {
            seek();
          }}
        />
        <div className="controls-bar">
          <a
            className="button"
            onClick={NotImplemented}>
              <MdFastRewind />
          </a>
          <a
            className="button"
            onClick={() => {
              setPlaying(!playing);
            }}
          >
            {playing ? <MdPause /> : <MdPlayArrow />}
          </a>
          <a
            className="button"
            onClick={NotImplemented}>
              <MdFastForward />
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  let [selectedSong, changeSelection] = React.useState<number | null>(null);
  let [songs, setSongs] = React.useState<Song[]>([]);

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
        <div className="header">
            <h1 className="logo">musicblob</h1>
            <input type="text" placeholder="What do you want to hear?"/>
            <input type="button" value="Search" onClick={NotImplemented} />
            <a onClick={NotImplemented}>Sign Up</a>
            <a onClick={NotImplemented}>Login</a>
        </div>
        <SongList
          songs={songs}
          onSelect={(i) => {
            changeSelection(i);
          }}
        />
      </div>
      {selectedSong === null ? "" : <PlayBar song={songs[selectedSong]} />}
    </div>
  );
}

export default App;
