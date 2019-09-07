/* eslint-disable prettier/prettier */
import styled, { keyframes } from 'styled-components';

const test = keyframes`
  0% {
    left: 50%;
  }
  25% {
    left: 90%;
  }
  50% {
    left: 50%;
  }
  75% {
    left: 0%;
  }
  100% {
    left: 50%;
  }
`;
export default styled.h1`
    position: absolute;
    top: 15%;
    left: 50%;
    color: white;
    text-transform: uppercase;
    transform: translate(-50%, -50%);
    font-weight: bold;
    display: inline;
    font-size: 46px;
    text-align: center;
    word-spacing: 10px;
    font-family: 'Purisa' ;
    transition: .3s ease-in-out;
    animation: ${test} 5s linear;
`;
