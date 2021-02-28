import firebase from "firebase/app";
import "firebase/firestore";
// import env from "dotenv";

// env.config();
console.log("TEST");
console.log(process.env.REACT_APP_KEY);
console.log(process.env.REACT_APP_DOMAIN);
console.log(process.env.REACT_APP_PROJECT);
console.log(process.env.REACT_APP_BUCKET);
console.log(process.env.REACT_APP_SENDER);
console.log(process.env.REACT_APP_APPID);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER,
  appId: process.env.REACT_APP_APPID,
};

firebase.initializeApp(firebaseConfig);

const ref = firebase.firestore().collection("albums");

export function getData() {
  var items;
  ref.get().then((item) => {
    items = item.docs.map((doc) => doc.data());

    console.log(items);

    // items
    //   .filter((fil) => fil.name === "album1")
    //   .map((album) => {
    //     console.log(album.songs);
    //   });
  });

  return items;
}

export default firebase;
