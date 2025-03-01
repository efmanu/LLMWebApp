import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-top: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  height: 50px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

function ChatInput({ onSendMessage, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <InputContainer>
      <Form onSubmit={handleSubmit}>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <SendButton type="submit" disabled={!input.trim() || isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </SendButton>
      </Form>
    </InputContainer>
  );
}

export default ChatInput; 