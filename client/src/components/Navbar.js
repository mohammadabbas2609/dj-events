import { Link, useHistory } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userAction";
import "../styles/navbar.css";
import Search from "./Search";

const Navbar = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const openRef = useRef("");
  const positionRef = useRef("");
  function changeStyle() {
    openRef.current.classList.toggle("open");
    positionRef.current.classList.toggle("positionOpen");
  }

  const { userInfo } = useSelector(state => state.login);

  const logoutUser = function () {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <nav className="navbar" ref={openRef}>
      <ul className="nav-items">
        <li className="brand-logo item">
          <Link to="/">
            <h3>DJ Events</h3>
          </Link>
        </li>
        <li className="search-item item">
          <Search />
        </li>
        <div className="menu">
          <FiMenu className="menu-icon" onClick={changeStyle} />
        </div>
        <div className={`links ${userInfo ? "lg" : "sm"}`} ref={positionRef}>
          <li className="item">
            <Link to="/events">Events</Link>
          </li>
          {userInfo ? (
            <>
              <li className="item">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="item">
                <Link to="/create-event">Add Event</Link>
              </li>
              <li className="item">
                <Link onClick={logoutUser} to="/login">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li className="item">
              <Link className="login" to="/login">
                Login <BsChevronRight />
              </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
