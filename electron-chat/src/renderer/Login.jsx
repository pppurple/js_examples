import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

const FORM_STYLE = {
  margin: "0 auto",
  padding: 30
};

const SIGNUP_LINK_STYLE = {
  display: "inline-block",
  marginLeft: 10
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.userEmail || "",
      password: localStorage.userPassword || "",
      errors: []
    };
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  };

  handleOnChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleOnChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleOnSubmit(e) {
    const { email, password } = this.state;
    const errors = [];
    let isValid = true;
    e.preventDefault();
    if (!email.length) {
      isValid = false;
      errors.push("Email can't be blank.");
    }
    if (!password.length) {
      isValid = false;
      errors.push("Password can't be blank.");
    }
    if (!isValid) {
      this.setState({ errors });
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      localStorage.userEmail = email;
      localStorage.userPassword = password;
      hashHistory.push("/rooms");
    }).catch(() => {
      this.setState({ errors: ["Incorrect email or password."]});
    });
  }

  render() {
    return (
      <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
        <Errors errorMessages={this.state.errors} />
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            onChange={this.handleOnChangeEmail}
            value={this.state.email}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            onChange={this.handleOnChangePassword}
            value={this.state.password}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-large btn-default">Login</button>
          <div style={SIGNUP_LINK_STYLE}>
            <Link to="/signup">create new account</Link>
          </div>
        </div>
      </form>
    );
  }
}