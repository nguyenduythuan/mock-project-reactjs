import styled, { keyframes } from 'styled-components';

const test = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;
export default styled.img`
  width: 100%;
  height: 100vh;
  display: block;
  transition: 0.3s ease-in-out;
  animation: ${test} 6s ease-in-out infinite;
`;
