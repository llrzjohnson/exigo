import { FlexProps } from '@chakra-ui/core';
import React, { useContext, useEffect } from 'react';
import { useInterval } from 'web-api-hooks';

import CarouselContext from './CarouselContext';
import CarouselSlide from './CarouselSlide';
import ScrollSnapContainer from './ScrollSnapContainer';

export interface CarouselRotatorProps extends FlexProps {
  children?: React.ReactElement | React.ReactElement[];
  playInterval?: number;
  ignoreTargetChange?: boolean;
  onScrollEnd?(): void;
}

export default function CarouselRotator({
  children = [],
  playInterval = 5000,
  ...restProps
}: CarouselRotatorProps) {
  const [
    [isHovered],
    [isFocused],
    [disableAutoPause],
    [shownIndex, setShownIndex],
    [targetIndex, setTargetIndex],
    [totalCount, setTotalCount],
    [isPlaying],
  ] = useContext(CarouselContext);

  // Keep amount of slides updated
  useEffect(() => {
    setTotalCount(React.Children.count(children));
  });

  // Auto-rotate slides if desired
  useInterval(
    () => {
      setTargetIndex((shownIndex + 1) % totalCount);
    },
    isPlaying && ((!isHovered && !isFocused) || disableAutoPause)
      ? playInterval
      : null,
  );

  return (
    <ScrollSnapContainer
      shownIndex={shownIndex}
      targetIndex={targetIndex}
      aria-atomic={false}
      aria-live={isPlaying ? 'off' : 'polite'}
      onMouseDown={e => {
        // Disable mouse wheel scrolling between slides
        if (e.button === 1) e.preventDefault();
      }}
      onShownIndexChange={setShownIndex}
      onTargetIndexChange={setTargetIndex}
      {...restProps}
    >
      {React.Children.map(children, (child, i) => (
        // Labels are lifted up to comply with WAI-ARIA Authoring Practices
        <CarouselSlide
          inert={i !== shownIndex ? '' : undefined}
          aria-label={child.props['aria-label']}
          aria-labelledby={child.props['aria-labelledby']}
        >
          {React.cloneElement(child, {
            'aria-label': undefined,
            'aria-labelledby': undefined,
          })}
        </CarouselSlide>
      ))}
    </ScrollSnapContainer>
  );
}
