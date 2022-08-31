import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { CardBtnClass, ICardButtonsGroup } from '../../../../../interface/textbook';
import { CSSClass } from '../../../../../interface/freeText';

export default function CardButtonsGroup({ word, userWords, hardBtnSet }: ICardButtonsGroup): React.ReactElement {
  const [isDoneActive, setDoneActive] = useState(false);
  const [isHardActive, setHardActive] = useState(false);

  const toggleClass = (btnClass: CardBtnClass): void => {
    switch (btnClass) {
      case 'done':
        setDoneActive(!isDoneActive);
        break;
      case 'hard':
        setHardActive(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    userWords.then((arr) => {
      if (arr.includes(word.id)) {
        toggleClass('hard');
      }
    });
  });

  return (
    <div className={CSSClass.cardIconButtonsWrapper}>
      <IconButton aria-label="done" onClick={(): void => toggleClass('done')}>
        <DoneIcon fontSize="large" className={`${isDoneActive && CSSClass.cardDoneActive}`} />
      </IconButton>
      <IconButton
        aria-label="hard"
        onClick={
        (): void => {
          toggleClass('hard');
          hardBtnSet(word);
        }
        }
        disabled={isHardActive}
      >
        <PsychologyIcon fontSize="large" className={`${isHardActive && CSSClass.cardHardActive}`} />
      </IconButton>
    </div>
  );
}
