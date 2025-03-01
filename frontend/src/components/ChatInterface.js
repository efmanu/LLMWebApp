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
      
      // Add thinking message immediately
      const thinkingMessage = { type: 'thinking', content: 'AI is thinking...' };
      setMessages(prev => [...prev, thinkingMessage]);

      // Small delay to ensure thinking message is rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      // Send request to backend
      const response = await axios.post('http://localhost:9080/calculate', {
        query: query
      });

      // Remove thinking message and add AI response
      setMessages(prev => 
        prev.filter(msg => msg.type !== 'thinking')
          .concat({ type: 'ai', content: response.data.result })
      );
    } catch (error) {
      console.error('Error:', error);
      
      // Remove thinking message and add error message
      setMessages(prev => 
        prev.filter(msg => msg.type !== 'thinking')
          .concat({ 
            type: 'error', 
            content: 'Sorry, there was an error processing your request.' 
          })
      );
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