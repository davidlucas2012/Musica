import React, { useEffect, useState } from "react";
import "./AlbumDetails.css";
import ply from "../../images/play.png";
import Rating from "@material-ui/lab/Rating";

function AlbumDetails(props) {
  const { album, playTrack, addToCart, cart } = props;
  const { id, sid } = props.match.params;
  const [selectedAlbum, setselectedAlbum] = useState();
  const [added, setadded] = useState(null);

  useEffect(() => {
    if (album) album.filter((f) => f.id === id).map((a) => setselectedAlbum(a));
  }, [album]);

  useEffect(() => {
    cart.map((m) => {
      if (m.albumId === id) setadded(true);
    });
  }, [cart]);

  const Play = (e) => {
    var trackNumber = e.target.getAttribute("songid");
    playTrack(trackNumber);
  };

  const handleAdd = () => {
    added ? (window.location.href = "/cart") : addToCart(id);
  };

  return !selectedAlbum ? null : (
    <div className="ad-main-cont">
      <span className="ad-year">{selectedAlbum.year}</span>
      <span className="ad-name">
        {selectedAlbum.name}
        <Rating
          className="ratings"
          name="half-rating-read"
          defaultValue={selectedAlbum.ratings}
          precision={0.5}
          readOnly
        />
        <span className="ad-ratings">({selectedAlbum.ratings.toFixed(1)})</span>
      </span>
      <span className="ad-artist">{selectedAlbum.artist}</span>
      <div className="cover-track-cont">
        <div className="ad-left-cont">
          <img className="ad-cov" src={selectedAlbum.cover}></img>
          <div className="ad-buy-cont">
            <span className="ad-price">
              ${(selectedAlbum.ratings * 5).toFixed(2)}
            </span>
            <span className="ad-cart" onClick={handleAdd}>
              {added ? "GO TO CART" : "ADD TO CART"}
            </span>
            <span className="ad-added">
              {added ? "Album added to cart" : ""}
            </span>
          </div>
        </div>
        <div className="track-cont">
          {selectedAlbum.songs.map((m, number) => (
            <div
              key={number}
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
