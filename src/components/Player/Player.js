import React, { useState, useEffect } from "react";
import "./Player.css";
import next from "../../images/next.png";
import play from "../../images/play.png";
import pos from "../../images/pause.png";
import vol from "../../images/vol.png";

function Player(props) {
  const { album, trackNumber } = props;
  const [song, setsong] = useState(null);
  const [Album, setAlbum] = useState(null);
  const [pause, setpause] = useState(false);
  const [count, setcount] = useState(
    (0).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  );
  const Play = () => {
    setpause(true);
    for (var i = 0; i < 100; i++) {
      task(i);
    }
  };

  const Pause = () => {
    setcount(
      (0).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
    setpause(false);
  };

  function task(i) {
    setTimeout(function () {
      var c = i.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      setcount(c);
    }, 1000 * i);
  }

  useEffect(() => {
    if (!album) return;
    album.map((m) => {
      return m.songs
        .filter((f) => f.songId == trackNumber)
        .map((s) => {
          setsong(s);
          console.log(s);
          album
            .filter((f) => f.id === s.albumId)
            .map((m) => {
              console.log(m);
              setAlbum(m);
            });
        });
    });
  }, [trackNumber]);
  return !Album ? null : (
    <div className="pl-main-cont">
      <img className="pl-prev" src={next}></img>

      {pause ? (
        <img className="pl-play" src={pos} onClick={Pause}></img>
      ) : (
        <img className="pl-play" src={play} onClick={Play}></img>
      )}
      <img className="pl-next" src={next}></img>

      <img
        className={pause ? "pl-cover-rotate" : "pl-cover"}
        src={Album.cover}
        alt="cover"
      ></img>

      <div className="pl-middle-cont">
        <div className="pl-upper-mid">
          <span className="pl-song-title"> {song.title}</span>
        </div>
        <div className="pl-mid-mid">
          <span className="pl-sync"></span>
        </div>
        <div className="pl-lower-mid">
          <span className="pl-dur-start">0:{count}</span>
          <span className="pl-dur-end">{song.dur}</span>
        </div>
      </div>

      <div className="pl-end-cont">
        <img className="pl-vol" src={vol}></img>
      </div>
    </div>
  );
}

export default Player;
