import React from "react";
import { Link } from "react-router-dom";
import { Person, Create, ExitToApp } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onClick = () => {
    dispatch(logout());
  };
  return (
    <div className="header">
      <section>
        {user ? (
          <Link to="/" className="header-title">
            <Typography variant="h3" color="textPrimary">
              Programming Cheatsheet App
            </Typography>
          </Link>
        ) : (
          <Typography variant="h3" color="textPrimary">
            Programming Cheatsheet App
          </Typography>
        )}
      </section>
      {user ? (
        <section className="header-buttons">
          <Link to="/create" className="header-icon">
            <Create />
            Create Note
          </Link>
          <Link to="/login" className="header-icon" onClick={onClick}>
            <ExitToApp />
            Logout
          </Link>
        </section>
      ) : (
        <section className="header-buttons">
          <Link to="/login" className="header-icon">
            <Person />
            Login
          </Link>
          <Link to="/register" className="header-icon">
            <Create />
            Register
          </Link>
        </section>
      )}
    </div>
  );
};

export default Header;
