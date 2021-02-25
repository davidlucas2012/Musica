import React from "react";
import SongCard from "../SongCard/SongCard";
import "./TopSongs.css";

function TopSongs(props) {
  const { topSongs, album } = props;
  return (
    <div className="ts-main-cont">
      <span className="ts-title">Top Songs</span>
      <div className="ts-cont">
        {topSongs.map((song, index) => (
          <SongCard key={index} songs={song} album={album} />
        ))}
      </div>
    </div>
  );
}

export default TopSongs;
