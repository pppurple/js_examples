import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
import Room from "./Room";

import firebase from "firebase/firebase-browser";

// routing
const appRouting = (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="rooms" component={Rooms}>
        <Route path=":roomId" component={Room} />
      </Route>
    </Route>
  </Router>
);

// initialize
if (!location.hash.length) {
  location.hash = "#/login";
}

// Initialize Firebase
var config = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "aaaaaaaaaaaaaaaaa.firebaseapp.com",
  databaseURL: "https://zzzzzzzzzzzzzzz",
  projectId: "yyyyyyyyyyyyy"
};
firebase.initializeApp(config);

render(appRouting, document.getElementById("app"));