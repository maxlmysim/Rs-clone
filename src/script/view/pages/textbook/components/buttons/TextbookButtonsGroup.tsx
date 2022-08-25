import * as React from 'react';
import MenuButton from './MenuButton';
import PageButtonsGroup from './PageButtonsGroup';
import { CSSClass } from '../../../../../interface/freeText';
import { MenuItemLength } from '../../../../../interface/textbook';

export default function TextbookButtonsGroup({ itemsLength }: MenuItemLength): React.ReactElement {
  return (
    <div className={CSSClass.textbookButtonsGroup}>
      <MenuButton itemsLength={itemsLength} />
      <PageButtonsGroup />
    </div>
  );
}
