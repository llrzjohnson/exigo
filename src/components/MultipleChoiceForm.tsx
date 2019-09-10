import { Radio, RadioGroup } from '@chakra-ui/core';
import React, { useState } from 'react';
import MultipleChoiceQuizItemProps from '../models/MultipleChoiceQuizItemProps';
import Option from '../models/Option';
import { QUIZ_ITEM_CARD_PADDING } from './QuizItemCard';

interface SelectSingleItemFormProps extends MultipleChoiceQuizItemProps {
  onChange: (choiceID: Option['id']) => void;
}

export default function MultipleChoiceForm({
  choices,
  solutionID,
  onChange,
}: SelectSingleItemFormProps) {
  const [selectedChoiceID, setSelectedChoiceID] = useState<Option['id']>();

  return (
    <RadioGroup
      value={String(selectedChoiceID)}
      onChange={(event: any) => {
        const choiceID: Option['id'] = Number(event.target.value);
        setSelectedChoiceID(choiceID);
        onChange(choiceID);
      }}
      spacing={0}
    >
      {choices.map((choice, i) => {
        let color;
        if (choice.id === solutionID) {
          color = 'green';
        } else if (choice.id === selectedChoiceID) {
          color = solutionID ? 'red' : 'blue';
        }

        let bgColor;
        if (color) {
          bgColor = `${color}.200`;
        } else if (i % 2 === 0) {
          bgColor = 'gray.50';
        }

        return (
          // TODO: Use 'isReadOnly' prop instead of 'isDisabled'
          // See: https://github.com/chakra-ui/chakra-ui/issues/52
          <Radio
            key={choice.id}
            value={String(choice.id)}
            isDisabled={Boolean(solutionID && selectedChoiceID)}
            isFullWidth
            px={QUIZ_ITEM_CARD_PADDING}
            py={3}
            color={color}
            bg={bgColor}
          >
            {choice.text}
          </Radio>
        );
      })}
    </RadioGroup>
  );
}
