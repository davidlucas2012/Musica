import React, { useEffect, useState } from "react";

import TopAlbum from "../TopAlbum/TopAlbum";
import TopSongs from "../TopSongs/TopSongs";
import "./Home.css";

function Home(props) {
  const { album } = props;
  const [topSongs, settopSongs] = useState([]);

  console.log(album);

  function getdata() {
    //get songs in album
    album
      .filter((fil) => fil.name === "album1")
      .map((album) => {
        console.log(album.songs);
      });

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
      <TopAlbum album={album} />
      <TopSongs topSongs={topSongs} album={album} />
    </div>
  );
}

export default Home;
