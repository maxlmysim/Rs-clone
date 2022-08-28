import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { CardBtnClass } from '../../../../../interface/textbook';
import { CSSClass } from '../../../../../interface/freeText';

export default function CardButtonsGroup(): React.ReactElement {
  const [isDoneActive, setDoneActive] = useState(false);
  const [isHardActive, setHardActive] = useState(false);
  const toggleClass = (btnClass: CardBtnClass): void => {
    switch (btnClass) {
      case 'done':
        setDoneActive(!isDoneActive);
        break;
      case 'hard':
        setHardActive(!isHardActive);
        break;
      default:
        break;
    }
  };

  return (
    <div className={CSSClass.cardIconButtonsWrapper}>
      <IconButton aria-label="done" onClick={(): void => toggleClass('done')}>
        <DoneIcon fontSize="large" className={`${isDoneActive && CSSClass.cardDoneActive}`} />
      </IconButton>
      <IconButton aria-label="hard" onClick={(): void => toggleClass('hard')}>
        <PsychologyIcon fontSize="large" className={`${isHardActive && CSSClass.cardHardActive}`} />
      </IconButton>
    </div>
  );
}
