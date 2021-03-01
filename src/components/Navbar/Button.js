import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import pic from "../../images/profile.jpeg";

export function Button() {
  return (
    <Link to="/#">
      {/* <button className="btn">Sign Up</button> */}
      <img src={pic} className="pic"></img>
    </Link>
  );
}
