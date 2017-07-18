import React from "react";
import { ipcRenderer } from "electron";
import styles from "./Pincode.css";

export default class Pincode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pincode: "" };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnClickCancel = this.handleOnClickCancel.bind(this);
  }

  handleOnChange(e) {
    this.setState({ pincode: e.target.value });
  }

  handleOnSubmit() {
    const { pincode } = this.state;
    if (!pincode) {
      return;
    }
    ipcRenderer.send("SEND_PIN", { pincode });
  }

  handleOnClickCancel() {
    ipcRenderer.send("CANCEL_PIN");
  }

  render() {
    return (
      <form className={styles.root} onSubmit={this.handleOnSubmit}>
        <input
          className="form-control"
          placeholder="Input PIN code"
          value={this.state.pincode}
          onChange={this.handleOnChange}
        />
        <div className={styles.buttons}>
          <button type="button" className="btn btn-default" onClick={this.handleOnClickCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary">OK</button>
        </div>
      </form>
    );
  }
}
