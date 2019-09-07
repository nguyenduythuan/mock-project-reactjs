import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    // overflow: hidden;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters {
    display: flex;
    justify-content: space-between;
    padding: 0 100px
}
a {
  padding: 10px 23px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.5s ease-in-out;
}
a.active {
  background: seagreen;
  opacity: 1;
  border-radius: 4px;
}
button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary {
  box-shadow: none;
}
button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary a {
  padding: 0;
  background: none
}
h6.MuiTypography-root.MuiTypography-h6 {
  font-size: 27px;
  font-weight: bold;
}
`;

export default GlobalStyle;
