import React, { useRef } from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsSkipEndCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";

const Player = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
}) => {
  const clickRef = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
setisplaying(false)

    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
    setTimeout(() => {
      setisplaying(true)
    
    }, 50)
  };

  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
setisplaying(false)
    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
setTimeout(() => {
  setisplaying(true)

}, 50)
  };
if(audioElem.current) {
  audioElem.current.onended = () => {
    console.log("SONG END")
    skiptoNext();
  }
}
function formatTime(sec) {
  const mins = (sec / 60).toString().split(".")[0]
const seconds = (sec.toFixed(0) % 60)
return `${seconds == 0 ? mins+1 : mins}:${seconds.toString().length == 1 ? "0"+seconds.toString() : seconds}`
}
  return (
    <div className="player_container">
      { currentSong ? <img src={currentSong.thumbnail} /> : null}
      <div className="title">
        <p>{currentSong.title} - {audioElem.current ? formatTime(audioElem.current.currentTime) : null}/{audioElem.current ? formatTime(audioElem.current.duration) : null}</p>
      </div>
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div
            className="seek_bar"
            style={{ width: `${currentSong.progress + "%"}` }}
          ></div>
        </div>
      </div>
      <div className="controls">
        <BsFillSkipStartCircleFill className="btn_action" onClick={skipBack} />
        {isplaying ? (
          <BsFillPauseCircleFill
            className="btn_action pp"
            onClick={PlayPause}
          />
        ) : (
          <BsFillPlayCircleFill className="btn_action pp" onClick={PlayPause} />
        )}
        <BsFillSkipEndCircleFill className="btn_action" onClick={skiptoNext} />
      </div>
    </div>
  );
};

export default Player;
