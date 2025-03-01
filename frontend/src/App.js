import React from 'react';
import styled from 'styled-components';
import ChatInterface from './ChatInterface';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

function App() {
  return (
    <AppContainer>
      <Title>LLM Chat</Title>
      <ChatInterface />
    </AppContainer>
  );
}

export default App; 