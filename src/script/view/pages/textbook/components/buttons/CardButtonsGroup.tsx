import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardBtnClass, ICardButtonsGroup } from '../../../../../interface/textbook';
import { CSSClass } from '../../../../../interface/freeText';

export default function CardButtonsGroup({
  word, userWords, hardBtnSet, hardBtnRemove,
}: ICardButtonsGroup): React.ReactElement {
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
    async function getUserWords(): Promise<void> {
      await (userWords as Promise<string[]>).then((arr) => {
        if (arr.includes(word.id)) {
          toggleClass('hard');
        }
      });
    }
    getUserWords();
  }, [hardBtnSet]);

  return (
    <div className={CSSClass.cardIconButtonsWrapper}>
      <IconButton aria-label="done" onClick={(): void => toggleClass('done')}>
        <DoneIcon fontSize="large" className={`${isDoneActive && CSSClass.cardDoneActive}`} />
      </IconButton>
      <IconButton
        aria-label="hard"
        onClick={
          (hardBtnSet && ((): void => {
            toggleClass('hard');
            hardBtnSet(word);
          }))
          || (hardBtnRemove && ((): void => {
            setHardActive(false);
            hardBtnRemove(word);
          }))
        }
        disabled={isHardActive}
      >
        { hardBtnSet && <PsychologyIcon fontSize="large" className={`${isHardActive && CSSClass.cardHardActive}`} /> }
        { !hardBtnSet && <DeleteIcon fontSize="large" /> }
      </IconButton>
    </div>
  );
}
