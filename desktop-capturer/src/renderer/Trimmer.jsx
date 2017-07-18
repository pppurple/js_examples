import React from "react";
import { ipcRenderer } from "electron";
import styles from "./Trimmer.css";

function position2Bounds({ x1, x2, y1, y2 }){
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);
  return { x, y, width, height };
}

export default class Trimmer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClipping: false,
      clientPosition: {},
      screenPosition: {}
    };
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
  }

  handleOnMouseDown(e) {
    const clientPosition = {
      x1: e.clientX, y1: e.clientY,
      x2: e.clientX, y2: e.clientY
    };
    const screenPosition = {
      x1: e.screenX, y1: e.screenY,
      x2: e.screenX, y2: e.screenY
    };
    this.setState({
      isClipping: true,
      clientPosition,
      screenPosition
    });
  }

  handleOnMouseUp() {
    this.setState({ isClipping: false });
    const trimmedBounds = position2Bounds(this.state.screenPosition);
    if (trimmedBounds.width > 100 && trimmedBounds.height > 100) {
      ipcRenderer.send("SEND_BOUNDS", { trimmedBounds });
    }
  }

  handleOnMouseMove(e) {
    if (!this.state.isClipping) return;
    const clientPosition = this.state.clientPosition;
    clientPosition.x2 = e.clientX;
    clientPosition.y2 = e.clientY;
    const screenPosition = this.state.screenPosition;
    screenPosition.x2 = e.screenX;
    screenPosition.y2 = e.screenY;
    this.setState({ clientPosition, screenPosition });
  }

  handleOnMouseEnter(e) {
    if (!e.buttons) {
      this.setState({ isClipping: false });
    }
  }

  renderRect() {
    const bounds = position2Bounds(this.state.clientPosition);
    const inlineStyle = {
      left: bounds.x,
      top: bounds.y,
      width: bounds.width,
      height: bounds.height
    };
    return <div className={styles.rect} style={inlineStyle} />;
  }

  render() {
    return (
      <div className={styles.root}
        onMouseDown={this.handleOnMouseDown}
        onMouseUp={this.handleOnMouseUp}
        onMouseMove={this.handleOnMouseMove}
        onMouseEnter={this.handleOnMouseEnter}
      >
        { this.state.isClipping ? this.renderRect() : <div />}
      </div>
    );
  }
}