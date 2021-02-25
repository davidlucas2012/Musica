import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import searchImg from "../../images/search.png";
import musica from "../../images/musica.png";

function Navbar(props) {
  const { search } = props;
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [nav, setnav] = useState(false);
  const [searchValue, setsearchValue] = useState("");

  const handleClick = () => setClick(!click);

  useEffect(() => {
    search(searchValue);
  }, [searchValue]);

  const closeMobileMenu = () => {
    // window.location.reload(false);
    setClick(false);
    setsearchValue("");
  };

  const searchChange = (e) => {
    setsearchValue(e.target.value);
    // window.location.href = `./search/${e.target.value}`;
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setnav(true);
    } else {
      setnav(false);
    }
  };

  window.addEventListener("scroll", changeNav);

  return (
    <>
      <nav className={nav ? "navbar active" : "navbar"}>
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img className="mov-logo" src={musica} alt="logo"></img> Musica
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {/* <li className="nav-item">
            <Link
              to="/add-movie"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Add Movie
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/compare" className="nav-links" onClick={closeMobileMenu}>
              Compare
            </Link>
          </li>
          <li className="nav-item">
            <div className="nav-search">
              <img className="img-search" src={searchImg} alt="search"></img>
              <input
                className="search-field"
                onChange={searchChange}
                placeholder="Search..."
                value={searchValue}
              ></input>
            </div>
          </li>

          <li>
            <Link
              to="/sign-up"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;
