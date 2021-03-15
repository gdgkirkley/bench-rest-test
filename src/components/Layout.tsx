import * as React from "react";
import { createGlobalStyle } from "styled-components";

function Layout({ children }: React.PropsWithChildren<any>) {
  return (
    <>
      <header>Bench Test</header>
      <main>{children}</main>
      <GlobalStyle />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
    :root {
        --primary1: #098b8c;
        --primary2: #3eb3b5;
        --accent1: #efede8;
        --accent2: #f7f6f4;
        --grey1: #555559;
        --grey2: #a2a2a4;
        --grey3: #f5f5f5;

        --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

        --bgColour: var(--accent1);
        --textColour: var(--grey1);

        html {
            box-sizing: border-box;
            font-size: 10px;
        }
        *, *:before, *:after {
            box-sizing: inherit;
        }
        body {
            padding: 0;
            margin: 0;
            font-size: 0.9rem;
            color: var(--textColour);
            line-height: 1.5;
            font-family: "Roboto", Arial, Helvetica, sans-serif;
            font-weight: 400;
            min-height: 100vh;
            background: var(--bgColour);
        }
        header {
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background: var(--primary1);
            min-height: 5rem;
        }
        main {
            margin: 2rem auto 4rem;
            max-width: 90vw;
            width: 1600px;
            z-index: 2;
        }
    }

    /* roboto-regular - latin */
    @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url('../fonts/roboto-v20-latin-regular.eot'); /* IE9 Compat Modes */
    src: local(''),
        url('../fonts/roboto-v20-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../fonts/roboto-v20-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('../fonts/roboto-v20-latin-regular.woff') format('woff'), /* Modern Browsers */
        url('../fonts/roboto-v20-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../fonts/roboto-v20-latin-regular.svg#Roboto') format('svg'); /* Legacy iOS */
    }
    /* roboto-500 - latin */
    @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url('../fonts/roboto-v20-latin-500.eot'); /* IE9 Compat Modes */
    src: local(''),
        url('../fonts/roboto-v20-latin-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../fonts/roboto-v20-latin-500.woff2') format('woff2'), /* Super Modern Browsers */
        url('../fonts/roboto-v20-latin-500.woff') format('woff'), /* Modern Browsers */
        url('../fonts/roboto-v20-latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../fonts/roboto-v20-latin-500.svg#Roboto') format('svg'); /* Legacy iOS */
    }
    /* roboto-700 - latin */
    @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: url('../fonts/roboto-v20-latin-700.eot'); /* IE9 Compat Modes */
    src: local(''),
        url('../fonts/roboto-v20-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../fonts/roboto-v20-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
        url('../fonts/roboto-v20-latin-700.woff') format('woff'), /* Modern Browsers */
        url('../fonts/roboto-v20-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../fonts/roboto-v20-latin-700.svg#Roboto') format('svg'); /* Legacy iOS */
    }
`;

export default Layout;
