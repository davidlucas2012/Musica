import React, { useState, useEffect } from "react";
import SongCard from "../SongCard/SongCard";
import "./TopSongs.css";
import brush from "../../images/brush.png";

function TopSongs(props) {
  const { topSongs, album, playTrack, recents } = props;

  console.log(topSongs);
  return (
    <div className="ts-main-cont">
      <div className="ts-title-cont">
        <img className={recents ? "ts-brush-r" : "ts-brush"} src={brush}></img>
        <span className="ts-title">
          {recents ? "Recently Played" : "Top 10 Songs"}
        </span>
      </div>

      <div className="ts-cont">
        {recents
          ? recents
              .sort(
                ({ timeStamp: previousTime }, { timeStamp: currentTime }) =>
                  currentTime - previousTime
              )
              .slice(0, 10)

              .map((rec) =>
                topSongs
                  .filter((f) => f.songId === rec.trackNumber)
                  .map((song, index) => (
                    <SongCard
                      key={index}
                      songs={song}
                      album={album}
                      playTrack={playTrack}
                    />
                  ))
              )
          : topSongs
              .filter((f) => f.top)
              .sort(
                ({ top: previousTop }, { top: currentTop }) =>
                  previousTop - currentTop
              )
              .slice(0, 10)
              .map((song, index) => (
                <SongCard
                  key={index}
                  songs={song}
                  album={album}
                  playTrack={playTrack}
                />
              ))}
      </div>
    </div>
  );
}

export default TopSongs;
