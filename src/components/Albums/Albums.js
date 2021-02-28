import React from "react";
import AlbumCard from "../AlbumCard/AlbumCard";
import "./Albums.css";

function Albums(props) {
  const { album } = props;
  return (
    <div className="a-main-cont">
      <div className="a-title-cont">
        <span className="a-title">All Albums</span>
        <span className="a-count">({album.length})</span>
      </div>
      <div className="a-cont">
        {album
          ? album
              .sort(
                ({ id: previousId }, { id: currentId }) =>
                  currentId - previousId
              )
              .map((a) => <AlbumCard album={a} />)
          : null}
      </div>
    </div>
  );
}

export default Albums;
