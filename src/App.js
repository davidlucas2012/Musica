import React, { useEffect, useState } from "react";
import "./App.css";
import { Grow, CircularProgress, CardContent } from "@material-ui/core";
import { Switch, BrowserRouter, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import firebase from "./firebase";
import AlbumDetails from "./components/AlbumDetails/AlbumDetails";
import Player from "./components/Player/Player";
import Cart from "./components/Cart/Cart";
import Albums from "./components/Albums/Albums";

function App() {
  const [searchString, setsearchString] = useState("");
  const [album, setalbum] = useState();
  const [trackNumber, settrackNumber] = useState(null);
  const [cart, setcart] = useState(null);
  const [recents, setrecents] = useState(null);

  const search = (e) => {
    console.log(e);
    setsearchString(e);
  };

  const playTrack = (e) => {
    settrackNumber(e);
    addToRecent(e);
  };

  //get album from Firebase

  const albumLOc = firebase.firestore().collection("albums");
  const cartLoc = firebase.firestore().collection("cart");
  const recent = firebase.firestore().collection("recent");

  function getdata() {
    albumLOc.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());

      setalbum(items);
    });
  }

  function getCartItem() {
    console.log(cart);
    cartLoc.get().then((c) => {
      const cartItem = c.docs.map((doc) => doc.data());

      setcart(cartItem);
    });
  }

  function addToCart(id) {
    setcart((prev) => [...prev, { albumId: id }]);

    cartLoc.doc(id).set({
      albumId: id,
    });
  }

  function deleteItem(id) {
    setcart([]);
    cartLoc.doc(id).delete();
    cart
      .filter((f) => id != f.albumId)
      .map((m) => setcart((prev) => [...prev, m]));
  }

  function addToRecent(track) {
    recent.doc(track).set({
      trackNumber: track,
      timeStamp: new Date(),
    });

    getRecents();
  }

  function getRecents() {
    recent.get().then((r) => {
      const rec = r.docs.map((doc) => doc.data());

      setrecents(rec);
    });
  }

  useEffect(() => {
    getdata();
    getCartItem();
    getRecents();
  }, []);

  const RenderApp = (e) => {
    const location = useLocation();

    if (searchString === "") {
      switch (location.pathname) {
        case "/":
          return !album ? null : (
            <Grow in>
              <Home album={album} playTrack={playTrack} recents={recents} />
            </Grow>
          );
        case "/cart":
          return !album ? null : (
            <Grow in>
              <Cart cart={cart} album={album} deleteItem={deleteItem} />
            </Grow>
          );
        case "/albums":
          return !album ? null : (
            <Grow in>
              <Albums album={album} />
            </Grow>
          );
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
        {cart ? (
          <Navbar search={search} cart={cart} />
        ) : (
          <Navbar search={search} cart={cart} />
        )}

        <Switch>
          <Route
            path="/album-details/:id/:sid"
            render={(props) => (
              <AlbumDetails
                cart={cart}
                playTrack={playTrack}
                album={album}
                addToCart={addToCart}
                {...props}
              />
            )}
          />
          <Route path="/" component={RenderApp}></Route>
        </Switch>
        <Player album={album} trackNumber={trackNumber} />
      </BrowserRouter>
    </div>
  );
}

export default App;
