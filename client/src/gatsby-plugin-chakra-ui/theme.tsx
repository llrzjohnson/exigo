import { theme as defaultTheme } from '@chakra-ui/core';
import {
  faChevronLeft,
  faChevronRight,
  faGlasses,
  faMoon,
  faRunning,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { fromEntries } from '../utils/Object';

const faIconDefinitions = [
  faChevronLeft,
  faChevronRight,
  faGlasses,
  faMoon,
  faRunning,
  faSun,
];

const customIcons = fromEntries(
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
    ...customIcons,
  },
};

export default theme;