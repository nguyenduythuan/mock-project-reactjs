import styled from 'styled-components';
export default styled.div`
  position: relative;
  overflow: hidden;
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000ab;
    content: '';
  }
`;
