import React, { useState, useEffect } from "react";
import "./Player.css";
import next from "../../images/next.png";
import play from "../../images/play.png";
import stop from "../../images/stop.png";
import vol from "../../images/vol.png";

function Player(props) {
  const { album, trackNumber } = props;
  const [song, setsong] = useState(null);
  const [Album, setAlbum] = useState(null);
  const [pause, setpause] = useState(false);
  const [count, setcount] = useState("00");
  const [min, setmin] = useState(0);

  const Play = () => {
    setpause(true);
  };

  const Stop = () => {
    setcount("00");
    setpause(false);
  };

  useEffect(() => {
    let interval = null;
    if (pause) {
      var count = 1;
      interval = setInterval(() => {
        var val = count++;

        if (val > 59) {
          setmin((m) => m + 1);
          setcount("00");
          count = 1;
        } else {
          setcount(
            val.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })
          );
        }
      }, 1000);
    } else if (!pause) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [pause]);

  useEffect(() => {
    Stop();
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
        <img className="pl-play" src={stop} onClick={Stop}></img>
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
          <span className="pl-dur-start">
            {min}:{count}
          </span>
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
