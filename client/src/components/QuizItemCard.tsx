import { Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/core';
import React from 'react';

import QuizItem from '../models/QuizItem';
import Card from './Card';
import ExpandingTextarea from './ExpandingTextarea';

export const QUIZ_ITEM_CARD_PADDING = 6;

export interface QuizItemCardProps extends BoxProps {
  item: QuizItem;
  shownIndex: number;
  totalCount: number;
  isEditable?: boolean;
  onStemChange?: (stem: string) => void;
}

export default function QuizItemCard({
  item,
  shownIndex,
  totalCount,
  children,
  isEditable = false,
  onStemChange,
  ...restProps
}: QuizItemCardProps) {
  return (
    <Card
      as={Flex}
      flexDirection="column"
      overflowY="auto"
      boxShadow="lg"
      {...restProps}
    >
      <Box
        mx={QUIZ_ITEM_CARD_PADDING}
        mb={2}
        py={QUIZ_ITEM_CARD_PADDING + 2}
        borderBottomWidth={1}
      >
        <Text
          textTransform="uppercase"
          letterSpacing={2}
          fontSize="sm"
          color="gray.500"
          mb={2}
        >
          {shownIndex >= 0
            ? `Item #${shownIndex + 1} of ${totalCount}`
            : 'New item'}
        </Text>

        {isEditable ? (
          <ExpandingTextarea
            as="h3"
            variant="filled"
            placeholder="Problem to be solved" // TODO: Add type-specific examples
            size="lg"
            fontSize="xl"
            fontWeight={600}
            lineHeight="base"
            value={item.stem}
            onChange={(event: React.FormEvent<HTMLElement>) => {
              if (onStemChange) onStemChange(event.currentTarget.innerText);
            }}
          />
        ) : (
          <Heading
            as="h3"
            size="md"
            fontWeight={600}
            lineHeight="base"
            whiteSpace="pre-line"
          >
            {item.stem}
          </Heading>
        )}
      </Box>

      <Box flex={1} my={QUIZ_ITEM_CARD_PADDING - 1}>
        {children}
      </Box>
    </Card>
  );
}
