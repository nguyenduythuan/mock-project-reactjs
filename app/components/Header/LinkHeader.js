/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line prettier/prettier
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

export default styled(NavLink)`
  color: #fff;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.5s ease-in-out;
  opacity: 0.7;
  &:hover {
    background: #303f9f;
    transition: 0.5s ease-in-out;
    border-radius: 4px;
  }
`;
