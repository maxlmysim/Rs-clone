import * as React from 'react';
import MenuButton from './MenuButton';
import PageButtonsGroup from './PageButtonsGroup';
import { CSSClass } from '../../../../../interface/freeText';
import { ITextbookButtonsGroup } from '../../../../../interface/textbook';

export default function TextbookButtonsGroup({
  itemsLength, pagesLength, updateWords,
}
: ITextbookButtonsGroup): React.ReactElement {
  const [buttonText, setButtonText] = React.useState<string>('Страница 1');
  return (
    <div className={CSSClass.textbookButtonsGroup}>
      <MenuButton
        itemsLength={itemsLength}
        pagesLength={pagesLength}
        updateWords={updateWords}
        setPageButtonText={setButtonText}
      />
      <PageButtonsGroup
        pagesLength={pagesLength}
        updateWords={updateWords}
        buttonText={buttonText}
        setButtonText={setButtonText}
      />
    </div>
  );
}
