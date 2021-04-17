import React, {useRef, useEffect} from 'react';
import moment from 'moment';

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
               <div className={ props.user === message.username ? "sender" : "recipient"}>
                 {message.username}
               </div>
               <div className="message">
                 {message.text}
               </div>
               <div className="date">
                 {moment(message.date).add(3, 'hours').format('DD.MM.YYYY hh:mm')}
               </div>
             </li>
           )
         })}
        <div ref={messagesEndRef} />
       </ul>
      )
    }

  export default MessageList;