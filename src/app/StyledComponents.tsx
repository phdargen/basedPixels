'use client'

import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #0052FF;
  color: rgba(255, 255, 255, 0.87);
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: #FFFFFF;
  margin-bottom: 2rem;
`;

export const Card = styled.div`
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  margin-bottom: 1.5rem;
`;

export const Button = styled.button`
  background-color: #0052FF;
  color: #FFFFFF;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003cab;
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

export const AccountInfo = styled.div`
  margin-bottom: 1rem;
  line-height: 1.6;

  h2 {
    font-size: 1.5rem;
    color: #FFFFFF;
    margin-bottom: 0.5rem;
  }

  div {
    font-size: 0.9rem;
  }
`;

export const ConnectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1.5rem;
    color: #FFFFFF;
    margin-bottom: 1rem;
  }

  div {
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }
`; 