import { theme as defaultTheme } from '@chakra-ui/core';
import { faChevronRight, faRunning } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled, { CreateStyled } from '../../node_modules/@emotion/styled';

const faIconDefinitions = [faChevronRight, faRunning];

const customIcons = Object.fromEntries(
  faIconDefinitions.map(
    ({ iconName, icon: [width, height, , , svgPathData] }) => [
      iconName,
      {
        path: <path fill="currentColor" d={svgPathData as string} />,
        viewBox: `0 0 ${width} ${height}`,
      },
    ],
  ),
);

export const theme = {
  ...defaultTheme,
  icons: {
    ...defaultTheme.icons,
    customIcons,
  },
};

export default styled as CreateStyled<typeof theme>;
