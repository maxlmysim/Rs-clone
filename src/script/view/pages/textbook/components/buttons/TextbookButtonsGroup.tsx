import * as React from 'react';
import MenuButton from './MenuButton';
import PageButtonsGroup from './PageButtonsGroup';
import { CSSClass } from '../../../../../interface/freeText';

export default function TextbookButtonsGroup(): React.ReactElement {
  return (
    <div className={CSSClass.textbookButtonsGroup}>
      <MenuButton />
      <PageButtonsGroup />
    </div>
  );
}
