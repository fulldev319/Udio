import React from 'react';
import { MdPlayArrow, MdPause, MdFastForward, MdFastRewind } from 'react-icons/md';
import NotImplemented from '../NotImplemented/NotImplemented';

type Song = {
  title: string;
  artist: string;
  album_art_path: string;
  song_path: string;
};

function PlayBar(props: { song: Song }) {
  const [playProgress, setPlayProgress] = React.useState<number>(0);
  const [playing, setPlaying] = React.useState<boolean>(false);

  const audioPlayer = React.useRef<HTMLAudioElement | null>(null);
  const seeker = React.useRef<HTMLInputElement>(null);

  const playAnimationRef = React.useRef<number | null>(null);
  const refresh = () => {
    const currentTime = audioPlayer.current!.currentTime;
    const progress = currentTime / audioPlayer.current!.duration;
    setPlayProgress(progress);
    seeker.current!.value = progress.toString();
    playAnimationRef.current! = requestAnimationFrame(refresh);
  };

  React.useEffect(() => {
    if (audioPlayer.current) {
      if (playing) {
        audioPlayer.current.play();
        playAnimationRef.current! = requestAnimationFrame(refresh);
      } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(playAnimationRef.current!);
      }
    }
  }, [playing]);

  const seek = () => {
    let progress = parseFloat(seeker.current!.value);
    if (audioPlayer.current !== null) {
      audioPlayer.current.currentTime = progress * audioPlayer.current!.duration;
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
          onChange={seek}
        />
        <div className="controls-bar">
          <a className="button" onClick={NotImplemented}>
            <MdFastRewind />
          </a>
          <a
            className="button"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <MdPause /> : <MdPlayArrow />}
          </a>
          <a className="button" onClick={NotImplemented}>
            <MdFastForward />
          </a>
        </div>
      </div>
    </div>
  );
}

export default PlayBar;
