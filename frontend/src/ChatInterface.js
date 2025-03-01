import React, { useState } from 'react';
import styled from 'styled-components';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import axios from 'axios';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (query) => {
    try {
      setIsLoading(true);
      
      // Add user message to chat
      const userMessage = { type: 'user', content: query };
      setMessages(prev => [...prev, userMessage]);

      // Send request to backend
      const response = await axios.post('http://localhost:9080/calculate', {
        query: query
      });

      // Add AI response to chat
      const aiMessage = { type: 'ai', content: response.data.result };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { type: 'error', content: 'Sorry, there was an error processing your request.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContainer>
      <ChatHistory messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </ChatContainer>
  );
}

export default ChatInterface; 