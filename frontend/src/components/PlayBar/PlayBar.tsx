import React, { useEffect, useRef, useState } from 'react';
import { MdPlayArrow, MdPause, MdFastForward, MdFastRewind } from 'react-icons/md';
import { Song } from '../../shared/types';
import './PlayBar.scss';

interface PlayBarProps {
  song: Song;
}

const PlayBar: React.FC<PlayBarProps> = ({ song }) => {
  const [playProgress, setPlayProgress] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const seeker = useRef<HTMLInputElement>(null);
  const playAnimationRef = useRef<number | null>(null);

  const refresh = () => {
    if (audioPlayer.current && !isNaN(audioPlayer.current.duration)) {
      const currentTime = audioPlayer.current.currentTime;
      const progress = currentTime / audioPlayer.current.duration;
      setPlayProgress(progress);
      if (seeker.current) {
        seeker.current.value = progress.toString();
      }
      playAnimationRef.current = requestAnimationFrame(refresh);
    }
  };

  useEffect(() => {
    if (audioPlayer.current) {
      if (playing) {
        audioPlayer.current.play();
        playAnimationRef.current = requestAnimationFrame(refresh);
      } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(playAnimationRef.current!);
      }
    }
  }, [playing]);

  useEffect(() => {
    setPlaying(false);
    setPlayProgress(0);
    if (seeker.current) {
      seeker.current.value = '0';
    }
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = 0;
    }
  }, [song]);

  useEffect(() => {
    const handleSongEnd = () => {
      setPlaying(false);
      setPlayProgress(0);
      if (seeker.current) {
        seeker.current.value = '0';
      }
    };

    const audioElem = audioPlayer.current;
    if (audioElem) {
      audioElem.addEventListener('ended', handleSongEnd);
    }

    return () => {
      if (audioElem) {
        audioElem.removeEventListener('ended', handleSongEnd);
      }
    };
  }, []);

  const seek = () => {
    let progress = parseFloat(seeker.current!.value);
    if (audioPlayer.current && !isNaN(audioPlayer.current.duration)) {
      audioPlayer.current.currentTime = progress * audioPlayer.current!.duration;
    }
    setPlayProgress(progress);
  };

  const handleRewind = () => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = Math.max(0, audioPlayer.current.currentTime - 10); // Rewind 10 seconds
    }
  };

  const handleFastForward = () => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = Math.min(audioPlayer.current.duration, audioPlayer.current.currentTime + 10); // Fast forward 10 seconds
    }
  };

  return (
    <div className="play-bar">
      <img
        className="album-art"
        src={"http://localhost:8000/api/static/" + song.album_art_path}
      />
      <div className="info-bar">
        <div>{song.title}</div>
        <div>{song.artist}</div>
        <audio
          ref={audioPlayer}
          src={"http://localhost:8000/api/static/" + song.song_path}
          style={{ display: "none" }}
        />
        <input
          type="range"
          ref={seeker}
          value={isNaN(playProgress) ? '0' : playProgress.toString()}
          min="0"
          max="1"
          step="0.001"
          onChange={seek}
        />
        <div className="controls-bar">
          <a className="button" onClick={handleRewind}>
            <MdFastRewind />
          </a>
          <a className="button" onClick={() => setPlaying(!playing)}>
            {playing ? <MdPause /> : <MdPlayArrow />}
          </a>
          <a className="button" onClick={handleFastForward}>
            <MdFastForward />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlayBar;
