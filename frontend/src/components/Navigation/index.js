// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import {useState, useEffect} from "react"
import './Navigation.css';
import logo from "../../images/pngegg.png"
import NewSpot from "../createSpot"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const [create, setCreate] = useState("create")

  useEffect(() => {
    if (!sessionUser) {
      setCreate("createHidden")
    } else {
      setCreate("create")
    }
  }, [create, sessionUser])
  
  return (
    <>
    <div className="sticky">
    <div className="nav">
      <div className="title">
        <NavLink exact to="/" className="logo"><img className="logo"  alt="Trees" src={logo}/>
        <h1>OneStop</h1>
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/spots" className={create}>
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
