import React, { useEffect, useState } from "react";
import "./AlbumDetails.css";
import ply from "../../images/play.png";

function AlbumDetails(props) {
  const { album, playTrack } = props;
  const { id, sid } = props.match.params;
  const [selectedAlbum, setselectedAlbum] = useState();

  useEffect(() => {
    if (album) album.filter((f) => f.id === id).map((a) => setselectedAlbum(a));
  }, [album]);

  const Play = (e) => {
    var trackNumber = e.target.getAttribute("songid");
    playTrack(trackNumber);
  };

  return !selectedAlbum ? null : (
    <div className="ad-main-cont">
      <span className="ad-year">{selectedAlbum.year}</span>
      <span className="ad-name">{selectedAlbum.name}</span>
      <span className="ad-artist">{selectedAlbum.artist}</span>
      <div className="cover-track-cont">
        <div className="ad-left-cont">
          <img className="ad-cov" src={selectedAlbum.cover}></img>
          <div className="ad-buy-cont">
            <span className="ad-price">$20</span>
            <span className="ad-cart">ADD TO CART</span>
          </div>
        </div>
        <div className="track-cont">
          {selectedAlbum.songs.map((m, number) => (
            <div
              id={number}
              className={
                sid === m.songId ? "track-main-cont-musc" : "track-main-cont"
              }
            >
              <span className="ad-track-number">{number + 1}</span>
              <span className="ad-track-title">{m.title}</span>
              <img
                className="ad-play"
                src={ply}
                alt="play"
                songid={m.songId}
                onClick={Play}
              ></img>

              <span className="ad-track-dur">{m.dur}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlbumDetails;
