import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *:after, *:before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: 0;
}

body {
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.color};
  transition: all 0.15s linear;
  font-size: calc(14px + .5vw);
  font-family: 'Open Sans', sans-serif;
  line-height: 1.7;
  height: 100vh;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}

#root {
  /* width: 80%; */
  margin: 0 auto;
  color: #272727
}
`;

export default GlobalStyle;
