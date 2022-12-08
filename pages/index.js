import Head from "next/head"
import Image from "next/image"
import Player from '../components/Player';
import styles from "../styles/Home.module.css"
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
// import Player from "@madzadev/audio-player";
export default function Home() {
  const [songs, setSongs] = useState([]);
  const [info, setInfo] = useState({});
  const [isplaying, setisplaying] = useState(false);
  const [isshuffleon, setShuffle] = useState(false);
  const [isrepeating, setisrp] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [url, updateUrl] = useState("");
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const audioElem = useRef();

  const updateSongIndex = (index) => {
    if (window.location) {
      const url = process.browser ? new URLSearchParams(window.location.search) : null;
      if (url) {
        url.set("s", index);
        setSongIndex(index);
        window.location.search = url.toString()
      }
    }
  }
  useEffect(() => {
    if (songs[0] && !currentSong) {

      setCurrentSong(songs[songIndex])
    }
    if (!audioElem.current) return;
    audioElem.current.addEventListener('loadstart', () => {
      let duration = audioElem.current.duration;
      // The duration variable now holds the duration (in seconds) of the audio clip
      console.log("loaded start , duration: " + duration)

    })

    audioElem.current.addEventListener('loadedmetadata', () => {
      let duration = audioElem.current.duration;
      // The duration variable now holds the duration (in seconds) of the audio clip
      audioElem.current.currentTime = duration - 5;

      console.log("loaded metadata, duration: " + duration)
    })
    audioElem.current.addEventListener('loadeddata', () => {
      let duration = audioElem.current.duration;
      // The duration variable now holds the duration (in seconds) of the audio clip
      audioElem.current.currentTime = 0;
      console.log("loaded data, duration: " + duration)
      // audioElem.current.currentTime = 0;
    })
    if (isplaying) {
      audioElem.current.play();
    }
    else {
      audioElem.current.pause();
    }
  }, [currentSong, isplaying, songs, songIndex])
  const onLoadPlaylist = async () => {
    const playlist_d = await fetch("/api/search?url=" + url).then(r => r.json())
    console.log(playlist_d)
    setInfo(playlist_d)
    setSongs(playlist_d.videos.map((v) => {
      return {
        url: "/api/download?url=https://www.youtube.com/watch?v=" + v.videoId,
        title: v.title,
        ...v
      }
    }))
    setCurrentSong({
      title: playlist_d.videos[songIndex].title,
      url: "/api/download?url=https://www.youtube.com/watch?v=" + playlist_d.videos[songIndex].videoId,
      ...playlist_d.videos[songIndex]
    });

  }
  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    document.title = currentSong.title;
    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })

  }
  useEffect(() => {

    const url = process.browser ? new URLSearchParams(window.location.search) : null;
    //console.debug("URL STATE", url)
    if (url) {
      const playlist_url = url.get("p");
      const song_index = url.get("s");
      const autoload = url.get("a");
      if (songs.length === 0) {
      console.debug("QUERY LOADED", url.values(), playlist_url, song_index, autoload, window.location)
        updateUrl(playlist_url);
        setSongIndex(parseInt(songIndex || 0))
        if (autoload) onLoadPlaylist();
      }
    }
  }, [songs.length, songIndex, onLoadPlaylist])
  //if(url !== "" && songs.length === 0) onLoadPlaylist();
  // useEffect(())
  return (
    <div className={styles.container}>
      <Head>
        {/* <title>Choose a song</title> */}
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Header data={info} />
        {songs.length !== 0 ? <div className="App">
          <audio src={currentSong ? currentSong.url : songs[songIndex].url} ref={audioElem} onTimeUpdate={onPlaying} loop={isrepeating === 1} />

          <Player updateIndex={updateSongIndex} songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} isrepeating={isrepeating} setRepeat={setisrp} />
        </div> : <Wrapper>
          <h1>Playlist url</h1>
          <input name="playlist_url" type="url" value={url} onChange={(e) => updateUrl(e.target.value)} />
          <button onClick={onLoadPlaylist}>Load</button>
        </Wrapper>}
        <button onClick={() => {
          const d = [{
            "title": "Drake - Forever",
            "url": "/api/download?url=https://www.youtube.com/watch?v=Uq9gPaIzbe8"
          }]
          setSongs(d)
          setCurrentSong(d[songIndex]);
        }}> run the example </button>
        <p className="note">
          This has NO ADS, loads up to 100 songs from a playlist. {" "}
          <strike>  Only downside is that you have to hear song and cannot buffer through the song but you can still skip and go back to songs </strike> Fixed! {" "}
          works with YT PLAYLISTS ONLY
        </p>
        <p className="warning">
          This is still in development so there may be some errors but enjoy
        </p>
        {/* <p className="note">
        If you are using NPM v7 or above, you need to add{" "}
        <code>--legacy-peer-deps</code> at the end of the command above.
      </p>
      <h1>Usage</h1>
     
    
      <p className="warning">
        <code>&#39;trackList&#39;</code> is the mandatory prop and requires to pass in
        an array consisting of objects with <code>url</code>, <code>title</code>{" "}
        and <code>tags</code> keys.
      </p>
      <h1>Config for NextJS</h1>
      <p className="warning">
        If you are working in NextJS, there are 3 additional steps:
      </p>
      <p>
        1. <code>npm i next-images next-transpile-modules</code>
      </p>
      <p>
        2. Create <code>next.config.js</code> in your project&#39;s root
      </p>
      <p>3. Paste this in the newly created config file:</p>
    
      <h1>Options</h1>
      <p className="note">
        The default values of available options props are displayed.
      </p>
  
      <h1>Color schemas</h1>
      <p className="warning">
        You can further customize the player UI by editing the colors variable
        below.
      </p>
      <p className="note">
        Pre-defined color schemes are planned in the future.
      </p>
      <h1>Final notes</h1>
      <p className="warning">
        It&#39;s recommended to use CMS like a{" "}
        <a href="https://www.contentful.com">Contentful</a> or{" "}
        <a href="https://www.datocms.com">DatoCMS</a> to manage your audio files
        and access them via API.
      </p> */}
        <Footer />
      </Wrapper>
    </div>
  )
}
