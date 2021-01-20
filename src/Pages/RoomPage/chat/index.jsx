import React, { Component } from 'react';

import './index.css';
import MessageList from './messageList';
import SendMessageForm from './sendMessageForm';

class Chat extends Component {
    render() {
      return (
        <div>
          <p className="title">Chat</p>
          <MessageList ref={this.myRef} user={this.props.user} messages={this.props.messages}/>
          <SendMessageForm sendMessage={this.props.sendMessage}/>
       </div>
      )
    }
  }

  export default Chat;  