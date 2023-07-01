// frontend/src/components/Navigation/ProfileButton.js
import React, { useState} from "react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

        useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };




  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  console.log(showMenu)
  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
