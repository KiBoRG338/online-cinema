import React, {useRef, useEffect} from 'react';

import './index.css';

function MessageList(props) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [props.messages]);
      return (
        <ul className="message-list">                 
          {props.messages.map(message => {
            return (
             <li key={message._id}>
               <div className={ props.user===message.username ? "sender" : "recipient"}>
                 {message.username}
               </div>
               <div className="message">
                 {message.text}
               </div>
             </li>
           )
         })}
        <div ref={messagesEndRef} />
       </ul>
      )
    }

  export default MessageList;