// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data) {
          setErrors({error: "The provided credentials were invalid"});
        }
      });
  };

  const relogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({credential: "mario64", password: "password"}))
    .then(closeModal)
  }

  return (
    <>
      <h1>Log In</h1>
      <form className="creds" onSubmit={handleSubmit}>
        <div className="error">
            {errors.error && ` ${errors.error}`}
            </div>
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" className="submit"
        disabled={credential.length < 4 || password.length < 6}
        >Log In</button>
      <button onClick={relogin} className="user"
      >{`Mario User`}</button>
      </form>
    </>
  );
}

export default LoginFormModal;
