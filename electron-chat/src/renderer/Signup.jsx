import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

const SIGNUP_FORM_STYLE = {
  margin: "0 auto",
  padding: 30
};

const CANCEL_BUTTON_STYLE = {
  marginLeft: 10
};

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      photoURL: "",
      errors: []
    };
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangePhotoURL = this.handleOnChangePhotoURL.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleOnChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleOnChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleOnChangePhotoURL(e) {
    this.setState({ photoURL: e.target.value });
  }

  handleOnSubmit(e) {
    const { email, password, name, photoURL } = this.state;
    const errors = [];
    let isValid = true;
    e.preventDefault();
    if (!email.length) {
      isValid = false;
      errors.push("Email address can't be blank.");
    }
    if (!password.length) {
      isValid = false;
      errors.push("Password can't be blank.");
    }
    if (!name.length) {
      isValid = false;
      errors.push("Name can't be blank.");
    }
    if (!isValid) {
      this.setState({ errors });
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
      return newUser.updateProfile({
        displayName: name,
        photoURL
      });
    }).then(() => {
      hashHistory.push("/rooms");
    }).catch(err => {
      this.setState({ errors: [err.message] });
    });
  }

  render() {
    return (
      <form style={SIGNUP_FORM_STYLE} onSubmit={this.handleOnSubmit}>
        <Errors errorMessages={this.state.errors} />
        <div className="form-group">
          <label>Email address*</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleOnChangeEmail}
          />
        </div>
        <div className="form-group">
          <label>Password*</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleOnChangePassword}
          />
        </div>
        <div className="form-group">
          <label>User name*</label>
          <input
            type="text"
            className="form-control"
            placeholder="user name"
            value={this.state.name}
            onChange={this.handleOnChangeName}
          />
        </div>
        <div className="form-group">
          <label>Photo URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="photo URL"
            value={this.state.photoURL}
            onChange={this.handleOnChangePhotoURL}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-large btn-primary">Create new account</button>
          <Link to="/login">
            <button
              type="button"
              style={CANCEL_BUTTON_STYLE}
              className="btn btn-large btn-default"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    );
  }
}