import React, { useEffect, useState } from "react";
import AlbumCard from "../AlbumCard/AlbumCard";
import SongCard from "../SongCard/SongCard";
import "./SearchResult.css";

function SearchResult(props) {
  const [filterString, setfilterString] = useState(null);
  const { searchString, album, playTrack } = props;
  const [Songs, setSongs] = useState([]);

  useEffect(() => {
    album.map((album) => {
      return album.songs.map((s) => setSongs((prev) => [...prev, s]));
    });
  }, []);

  useEffect(() => {
    setfilterString(searchString.toLowerCase());
  }, [searchString]);

  const renderAlbumList = album
    .filter(
      (a) =>
        a.name.toLowerCase().includes(filterString) ||
        a.artist.toLowerCase().includes(filterString)
    )
    .map((al, index) => <AlbumCard key={index} album={al}></AlbumCard>);

  const renderMusicList = Songs.filter((a) =>
    a.title.toLowerCase().includes(filterString)
  ).map((song, index) => (
    <SongCard key={index} songs={song} album={album} playTrack={playTrack} />
  ));
  return (
    <div className="sr-main-cont">
      {/* <span className="sr-span">Search result related to: {searchString}</span> */}

      <span className="search-info">
        Albums or Artists Related to:
        <span className="sr-result">{searchString}</span>
      </span>

      <div className="album-list">{renderAlbumList}</div>
      <span className="search-info">
        Songs Related to:<span className="sr-result">{searchString}</span>
      </span>
      <div className="song-list">{renderMusicList}</div>
    </div>
  );
}

export default SearchResult;
