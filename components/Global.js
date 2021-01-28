import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

const Global = createGlobalStyle`
  ${normalize()};
  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  :root {
	--lightest: #fefefe;
	--lighter: #e6e7eb;
	--light: #ccced3;
	--gray: #a1a0a0;
	--dark: #625a5d;
	--darker: #28282f;
	--darkest: #14141d;
	--dark-green: #689f38;
	--main-green: #8bc34a;
	--light-green: #dcedc8;
	--orange: #ffab40;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    color: var(--lightest);
    background: var(--darkest);
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`;

export default Global;
