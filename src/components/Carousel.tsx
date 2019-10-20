import { Flex, FlexProps } from '@chakra-ui/core';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MarginProps, ResponsiveValue } from 'styled-system';
import { fromEntries } from '../utils/object';
import CarouselSlide from './CarouselSlide';

// TODO: https://www.w3.org/TR/wai-aria-practices-1.1/#grouped-carousel-elements

function negateResponsiveValue<T>(value: ResponsiveValue<T>) {
  if (value == null) return value;
  if (typeof value === 'number') return -value;
  if (typeof value === 'string') return `-${value}`;
  if (Array.isArray(value)) return value.map(v => (v != null ? `${-v}` : v));
  return fromEntries(
    Object.entries(value).map(([k, v]) => [k, v != null ? `${-v}` : v]),
  );
}

export interface CarouselProps extends FlexProps {
  children: React.ReactComponentElement<typeof CarouselSlide>[];
  role?: 'region' | 'group';
  spacing?: MarginProps['margin'];
  spacingX?: MarginProps['mx'];
  spacingY?: MarginProps['my'];
}

export default function Carousel({
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  role = ariaLabel || ariaLabelledby ? 'region' : 'group',
  spacing,
  spacingX,
  spacingY,
  ...restProps
}: CarouselProps) {
  return (
    <Flex
      role={role}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-live="polite" // The carousel is NOT automatically rotating
      my={negateResponsiveValue(spacingY != null ? spacingY : spacing)}
      overflow="auto"
      css={{
        scrollSnapType: 'x mandatory',
        '::-webkit-scrollbar': { width: 0 },
        '-ms-overflow-style': 'none',
        scrollbarWidth: 'none',
      }}
      {...restProps}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          px: spacingX != null ? spacingX : spacing,
          py: spacingY != null ? spacingY : spacing,
        }),
      )}
    </Flex>
  );
}
