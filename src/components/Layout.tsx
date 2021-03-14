import * as React from "react";
import { createGlobalStyle } from "styled-components";

function Layout({ children }: React.PropsWithChildren<any>) {
  return (
    <>
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

        --bgColour: var(--accent);
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
            font-size: 1.8rem;
            color: var(--textColour);
            line-height: 1.5;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 400;
            min-height: 100vh;
            background: var(--background);
        }
        main {
            margin: 2rem auto 4rem;
            max-width: 90vw;
            width: 1600px;
            z-index: 2;
        }
    }
`;

export default Layout;
