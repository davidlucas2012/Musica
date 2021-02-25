import React, { useEffect, useState } from "react";
import "./App.css";
import { Grow, CircularProgress } from "@material-ui/core";
import { Switch, BrowserRouter, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import firebase from "./firebase";
import AlbumDetails from "./components/AlbumDetails/AlbumDetails";

function App() {
  const [searchString, setsearchString] = useState("");
  const [album, setalbum] = useState();

  const search = (e) => {
    console.log(e);
    setsearchString(e);
  };

  const playTrack = (e) => {
    console.log(e);
  };

  //get album from Firebase

  const ref = firebase.firestore().collection("albums");

  function getdata() {
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());

      console.log(items);
      setalbum(items);
    });
  }

  useEffect(() => {
    getdata();
  }, []);

  const RenderApp = (e) => {
    const location = useLocation();

    if (searchString === "") {
      switch (location.pathname) {
        case "/":
          return !album ? null : (
            <Grow in>
              <Home album={album} />
            </Grow>
          );
        case "/f":
          return !album ? null : (
            <Grow in>
              <AlbumDetails album={album} />
              {/* <Home album={album} /> */}
            </Grow>
          );
        case "/add-movie":
          return null;
        default:
          return <div>DEFAULT</div>;
      }
    } else {
      return null;
      // <Grow in>
      //   <div className="sr-cont">
      //     <div className="span-cont">
      //       <span className="sr-span">Search result related to:</span>
      //       <span className="sr-result">{searchString}</span>
      //     </div>
      //     <SearchResult searchString={searchString} />
      //   </div>
      // </Grow>
    }
  };

  return (
    <div className="app-main-cont">
      <BrowserRouter>
        <Navbar search={search} />
        <Switch>
          <Route
            path="/album-details/:id/:sid"
            render={(props) => (
              <AlbumDetails playTrack={playTrack} album={album} {...props} />
            )}
          />
          <Route path="/" component={RenderApp}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
