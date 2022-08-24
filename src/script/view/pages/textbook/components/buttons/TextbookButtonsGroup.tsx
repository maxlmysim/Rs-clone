import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuButton from './MenuButton';
import PageButtonsGroup from './PageButtonsGroup';

export default function TextbookButtonsGroup(): React.ReactElement {
  return (
    <ButtonGroup className="textbook-buttons-group">
      <MenuButton />
      <PageButtonsGroup />
    </ButtonGroup>
  );
}
