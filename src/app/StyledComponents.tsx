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
  font-family: "Pixelify Sans", sans-serif;
  color: #FFFFFF;
  margin-bottom: 2rem;
`;

export const Card = styled.div`
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
  color: #F4F7FA;          /* 90% white */
  border-radius: 10px;
  box-shadow:
      0 6px 12px -4px rgba(0,0,0,0.45),
      0 1px 2px rgba(255,255,255,0.04);  /* optional edge highlight */
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  margin-bottom: 1.5rem;
`;

export const Button = styled.button`
  background-color: #FFFFFF;
  color: #0052FF;
  border: 1px solid #0052FF;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: #f0f0f0;
    color: #003cab;
    text-decoration: none;
  }

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    border-color: #cccccc;
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

export const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #FFFFFF;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  color: #FFFFFF;
  font-size: 0.9rem;
`; 