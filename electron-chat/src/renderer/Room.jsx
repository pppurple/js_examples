import React from "react";
import Message from "./Message";
import NewMessage from "./NewMessage";
import firebase from "firebase/firebase-browser";

const ROOM_STYLE = {
  padding: "10px 30px"
};

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      messages: []
    };
    this.db = firebase.database();
    this.handleMessagePost = this.handleMessagePost.bind(this);
  }

  componentDidMount() {
    const { roomId } = this.props.params;
    this.fetchRoom(roomId);
  }

  componentWillReceiveProps(nextProps) {
    const { roomId } = nextProps.params;
    if (roomId === this.props.params.roomId) {
      return;
    }
    if (this.stream) {
      this.stream.off();
    }
    this.setState({ messages: [] });
    this.fetchRoom(roomId);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.room.parentNode.scrollTop = this.room.parentNode.scrollHeight;
    }, 0);
  }

  componentWillUnmount() {
    if (this.stream) {
      this.stream.off();
    }
  }

  handleMessagePost(message) {
    const newItemRef = this.fbChatRoomRef.child("messages").push();
    this.user = this.user || firebase.auth().currentUser;
    return newItemRef.update({
      writtenBy: {
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL
      },
      time: Date.now(),
      text: message
    });
  }

  fetchRoom(roomId) {
    this.fbChatRoomRef = this.db.ref("/chatrooms/" + roomId);
    this.fbChatRoomRef.once("value").then(snapshot => {
      const { description } = snapshot.val();
      this.setState({ description });
      window.document.title = description;
    });
    this.stream = this.fbChatRoomRef.child("messages").limitToLast(10);
    this.stream.on("child_added", item => {
      const { messages } = this.state || [];
      messages.push(Object.assign({ key: item.key }, item.val()));
      this.setState({ messages });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div style={ROOM_STYLE} ref={room => this.room = room}>
        <div className="list-group">
          {messages.map(m => <Message key={m.key} message={m} /> )}
        </div>
        <NewMessage onMessagePost={this.handleMessagePost} />
      </div>
    );
  }
}