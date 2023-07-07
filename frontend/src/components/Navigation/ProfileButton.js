// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import {useHistory, NavLink} from "react-router-dom"
import ManageButton from "../manageSpots";

function ProfileButton({ user }) {
  const history = useHistory()

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="authcontainer">
      <div className="menubtn">
      <button onClick={openMenu} className="menu">
        <div className="awesomefont">
        <i className="fa-solid fa-bars fa-2x"></i>
        <i className="fas fa-user-circle fa-2x" />
        </div>
      </button>
      </div>
      <div className="auth">
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className="greeting">
            <li>Hello, {user.firstName}</li>
            <li>{user.email}</li>
          </div>
          <div>
            <NavLink to="/spots/current">
              <h1 className="managespots">
            manage
              </h1>
            </NavLink>
          </div>
          <div className="logout">
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </div>
          </>
        ) : (
          <>
          <div className="signup_login">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                />
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              />
        </div>
          </>
        )}
      </ul>
        </div>
    </div>
  );
}

export default ProfileButton;
