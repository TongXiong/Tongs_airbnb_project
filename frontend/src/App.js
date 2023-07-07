// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/spots/allSpots";
import GetOneSpot from "./components/DetailedSpot";
import NewSpot from "./components/createSpot";
import CurrentUserSpot from "./components/currentSpot";
import UpdateSpot from "./components/updateSpot";
import SelectiveId from "./components/updateSpot/select";
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
      <Route exact path="/spots/:spotId">
        <GetOneSpot />
      </Route>
      <Route exact path="/spots">
        <NewSpot />
      </Route>
        </Switch>}
      <Route exact path="/spots/current">
        <CurrentUserSpot />
      </Route>
      <Route exact path="/spots/:spotId/edit">
        <UpdateSpot />
        <SelectiveId />
      </Route>
      </>
  );
}

export default App;
