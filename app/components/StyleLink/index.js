import styled from 'styled-components';
import { Link } from 'react-router-dom';
export default styled(Link)`
  color: black !important;
  font-weight: bold;
  padding: 7px 20px;
  transition: 0.2s ease-in-out;
  position: relative;
  border: 1px solid gray;
  overflow: hidden;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    width: 60%;
    height: 100%;
    background: seagreen;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    transition: 0.2s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }
  &:hover:after {
    width: 101%;
    opacity: 1;
    visibility: visible;
    z-index: -1;
  }
  &:hover {
    text-decoration: none !important;
    color: white !important;
  }
`;
