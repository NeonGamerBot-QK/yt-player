import Image from "next/image"
import React, { useRef, useState } from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsSkipEndCircleFill,
  BsFillSkipEndCircleFill,
  BsShuffle,
} from "react-icons/bs";
import {
  TbRepeat,
  TbRepeatOnce,
  TbRepeatOff
} from "react-icons/tb"
const Player = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
  isrepeating,
  setRepeat,
  shuffle,
  setShuffle,
  updateIndex
}) => {
  const clickRef = useRef();
  const shuffleRef = useRef();
const [shuffledSongs, setShuffledSongs] = useState([])
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
      if(shuffle) {
        const pointer = shuffledSongs.length - 1
        updateIndex(pointer)
      setCurrentSong(shuffledSongs[pointer]);
      } else {
        const pointer = songs.length - 1;
        updateIndex(pointer)
        setCurrentSong(songs[pointer]);
      }
    } else {
      const pointer = index - 1;
      updateIndex(pointer)
      if(shuffle) {
        setCurrentSong(shuffledSongs[pointer]);
        } else
          setCurrentSong(songs[pointer]);
    }
    audioElem.current.currentTime = 0;
    setTimeout(() => {
      setisplaying(true)
    
    }, 50)
  };

  const skiptoNext = (loop) => {
    const index = shuffle ? Math.round(Math.random() * songs.length)-1 : songs.findIndex((x) => x.title == currentSong.title);
setisplaying(false)
setShuffledSongs((e) => [
  ...e,
  currentSong
])
    if (index == songs.length - 1 && !shuffle) {
      updateIndex(0)
      setCurrentSong(songs[0]);
    } else {
      const pointer = index + 1;
      setCurrentSong(songs[pointer]);
      updateIndex(pointer)
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
const myLoader = ({ src, width, quality }) => {
  return src;
}
function formatTime(sec) {
  const mins = (sec / 60).toString().split(".")[0]
const seconds = (sec.toFixed(0) % 60)
return `${seconds == 0 ? mins+1 : mins}:${seconds.toString().length == 1 ? "0"+seconds.toString() : seconds}`
}
const repeatClick = () => {
  console.log(isrepeating, "VALUE")
  if(isrepeating >= 2) return setRepeat(0) 
  setRepeat(isrepeating+1)
}
  return (
    <div className="player_container">
      { currentSong && currentSong.thumbnail ? <Image alt="Cover of song" loader={myLoader} src={currentSong.thumbnail} width={200} height={200}/> : null}
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
    <BsShuffle className="btn_action" onClick={() => {
      setShuffle(true)
    }}/>
{/*   <img src="/shuffle.png" className="btn_action" width={64 * 2} height={64 * 2}ref={shuffleRef} onClick={() => {
          shuffleRef.current.src = "/shuffle.gif";
        }}/> */}
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
       { isrepeating === 0 ? <TbRepeat className="btn_action" onClick={repeatClick} /> : isrepeating === 1 ? <TbRepeatOnce className="btn_action" onClick={repeatClick} />: isrepeating === 2 ? <TbRepeatOff   className="btn_action" onClick={repeatClick}/> : isrepeating} 
      </div>
    </div>
  );
};

export default Player;
