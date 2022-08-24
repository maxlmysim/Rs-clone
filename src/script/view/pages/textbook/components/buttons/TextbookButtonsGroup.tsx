import * as React from 'react';
import MenuButton from './MenuButton';
import PageButtonsGroup from './PageButtonsGroup';

export default function TextbookButtonsGroup(): React.ReactElement {
  return (
    <div className="textbook-buttons-group">
      <MenuButton />
      <PageButtonsGroup />
    </div>
  );
}
