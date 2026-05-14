import React from "react";

const ChatWidget = () => {
  return (
    <div className="chat-widget" role="button" aria-label="Chat with us">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
    </div>
  );
};

export default ChatWidget;
