import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  margin: 10px;
  padding: 12px;
  border-radius: 12px;
  ${props => {
    if (props.type === 'user') {
      return `
        background-color: #007bff;
        color: white;
        margin-left: auto;
      `;
    } else if (props.type === 'error') {
      return `
        background-color: #dc3545;
        color: white;
        margin-left: auto;
      `;
    } else if (props.type === 'thinking') {
      return `
        background-color: #f8f9fa;
        color: #6c757d;
        margin-right: auto;
        font-style: italic;
      `;
    } else {
      return `
        background-color: white;
        color: #333;
        margin-right: auto;
      `;
    }
  }}
`;

function ChatHistory({ messages }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <HistoryContainer>
      {messages.map((message, index) => (
        <MessageBubble key={index} type={message.type}>
          {message.content}
        </MessageBubble>
      ))}
      <div ref={bottomRef} />
    </HistoryContainer>
  );
}

export default ChatHistory; 