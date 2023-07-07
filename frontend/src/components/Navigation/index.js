// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../images/pngegg.png"
import NewSpot from "../createSpot"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
    <div className="sticky">
    <div className="nav">
      <div className="title">
        <NavLink exact to="/" className="logo"><img className="logo"  alt="Trees" src={logo}/>
        <h1>OneStop</h1>
        </NavLink>
      </div>
      <div className='create'>
        <NavLink exact to="/spots">
          create new spot
        </NavLink>
      </div>
      {isLoaded && (
        <li className="menucontainer">
          <div className='profilecontainer'>
          <ProfileButton user={sessionUser} />
          </div>
        </li>
      )}
      </div>
      </div>
      </>
  );
}

export default Navigation;
