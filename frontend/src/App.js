// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/spots/allSpots";
import GetOneSpot from "./components/DetailedSpot";
import Review from "./components/reviews/reviews";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
      <Route exact path="/">
    <SpotsBrowser />
      </Route>
      <Route path="/spots/:spotId">
        <GetOneSpot />
      </Route>
        </Switch>}
      </>
  );
}

export default App;
