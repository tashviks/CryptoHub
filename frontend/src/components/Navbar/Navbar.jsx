import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";

import { MenuList } from "./MenuList";

import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import logo from "../../images/cryptohub.png";
import "./Navbar.scss";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [isTop, setIsTop] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const menu = MenuList.map(({ title, url, icon }, index) => {
    return (
      <li key={index}>
        <NavLink className="nav_link" to={url} end>
          {icon}
          {title}
        </NavLink>
      </li>
    );
  });

  let distanceToTop = window.pageYOffset;

  window.addEventListener("scroll", () => {
    distanceToTop = window.pageYOffset;
    if (distanceToTop > 10) setIsTop(false);
    else setIsTop(true);
  });

  return (
    <>
      <header className={isTop ? "" : "scrolled"}>
        <div className="container">
          <div className="header_nav">
            <Link to="/" className="logo">
              <img src={logo} alt="" />
              Crypto<font>Hu₿</font>
            </Link>
            <ul className="nav_ul">
              {menu}
              {user ? (
                <li>
                  <button onClick={handleLogout} className="nav_link">
                    <LogoutOutlined /> Logout
                  </button>
                </li>
              ) : (
                <li>
                  <button className="nav_link" onClick={handleRegister}>
                    <UserAddOutlined /> Register
                  </button>
                  /
                  <button className="nav_link" onClick={handleLogin}>
                    <LoginOutlined /> Login
                  </button>
                </li>
              )}
            </ul>
            <div className="menu-icon" onClick={handleClick}>
              <i
                className={clicked ? "fas fa-times fa-2x" : "fas fa-bars fa-2x"}
                id="icon"
              ></i>
            </div>
          </div>
        </div>
      </header>
      <div className="nav_mobile">
        <ul
          className={clicked ? "nav_mobile-ul active" : "nav_mobile-ul"}
          onClick={handleClick}
        >
          {menu}
          {user ? (
            <li>
              <button onClick={handleLogout} className="nav_link">
                <LogoutOutlined /> Logout
              </button>
            </li>
          ) : (
            <li>
              <span>
                <button onClick={handleRegister}>
                  <UserAddOutlined /> Register
                </button>
                /
                <button onClick={handleLogin}>
                  <LoginOutlined /> Login
                </button>
              </span>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
