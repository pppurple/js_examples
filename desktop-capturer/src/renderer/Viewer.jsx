import React from "react";
import { ipcRenderer } from "electron";
import styles from "./Viewer.css";

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      sending: false
    };
    this.handleOnChangeMessage = this.handleOnChangeMessage.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on("REPLY_POST_TWEET", (e, args) => {
      if (args.error) {
        this.setState({ sending: false });
      } else {
        this.setState({
          message: "",
          sending: false
        });
      }
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners("REPLY_POST_TWEET");
  }

  handleOnChangeMessage(e) {
    this.setState({ message: e.target.value });
  }

  handleOnSubmit(e) {
    const { message, sending } = this.state;
    if (!message.length || sending) {
      return;
    }
    ipcRenderer.send("POST_TWEET", { message });
    this.setState({ sending: true });
    e.preventDefault();
  }

  renderTweetBtn() {
    if (this.state.sending) {
      return (
        <div className={styles.sending}>
          <div className="icon icon-hourglass" />
        </div>
      );
    } else {
      return (
        <button type="submit" className="btn btn-default">
          <span className="icon icon-twitter" />Tweet
        </button>
      );
    }
  }

  render() {
    return (
      <div className={styles.root} ref="root">
        <div className={styles.image}>
          <div>
            <img src={this.props.src} />
          </div>
        </div>
        <form className={styles.form} onSubmit={this.handleOnSubmit}>
          <input
            className="form-control"
            placeholder="tweet message"
            value={this.state.message}
            onChange={this.handleOnChangeMessage}
          />
          {this.renderTweetBtn()}
        </form>
      </div>
    );
  }
}