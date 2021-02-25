import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDelSV9ADCqYuLzfEDyLkteBL7quA4MQLg",
  authDomain: "musica-82294.firebaseapp.com",
  projectId: "musica-82294",
  storageBucket: "musica-82294.appspot.com",
  messagingSenderId: "979043319235",
  appId: "1:979043319235:web:19d8c5a7582ed13d8bd176",
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
