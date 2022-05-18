/** @jsxRuntime classic */
/** @jsx jsx */
import React, { Fragment } from 'react';
import { Global, jsx } from '@emotion/react';
import tw, { GlobalStyles as TwinGlobalStyles, css } from 'twin.macro';
import 'focus-visible';
import CircularRegular from '../assets/fonts/CircularXXSub-RegularSubset.woff';
import CircularLight from '../assets/fonts/CircularXXSub-LightSubset.woff';
import '../assets/styles/index.css';

export default function GlobalStyles() {
  return (
    <Fragment key="key">
      <TwinGlobalStyles />
      <Global
        styles={css`
          @font-face {
            font-family: 'Circular';
            src: url(${CircularRegular}) format('woff');
            font-style: normal;
            font-weight: 400;
          }

          @font-face {
            font-family: 'Circular';
            src: url(${CircularLight}) format('woff');
            font-style: normal;
            font-weight: 300;
          }

          .js-focus-visible :focus:not(.focus-visible),
          input[type='text']:focus,
          input[type='password']:focus {
            outline: none;
          }

          body {
            ${tw`text-gray-900 text-base`}
          }
        `}
      />
    </Fragment>
  );
}
