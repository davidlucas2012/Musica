import React, { useEffect, useState } from "react";

import TopAlbum from "../TopAlbum/TopAlbum";
import TopSongs from "../TopSongs/TopSongs";
import "./Home.css";
import cover from "../../images/cover.png";

function Home(props) {
  const { album, playTrack, recents } = props;
  const [topSongs, settopSongs] = useState([]);

  function getdata() {
    //get songs in album
    // album
    //   .filter((fil) => fil.name === "album1")
    //   .map((album) => {
    //     console.log(album.songs);
    //   });

    //get all songs
    album.map((album) => {
      return album.songs.map((s) => settopSongs((prev) => [...prev, s]));
    });
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="home-main-cont">
      <div className="home-cover">
        <img className="img-cover" src={cover} alt="cover"></img>
      </div>
      <TopAlbum album={album} />
      <TopSongs topSongs={topSongs} album={album} playTrack={playTrack} />
      <TopSongs
        topSongs={topSongs}
        album={album}
        playTrack={playTrack}
        recents={recents}
      />
    </div>
  );
}

export default Home;
