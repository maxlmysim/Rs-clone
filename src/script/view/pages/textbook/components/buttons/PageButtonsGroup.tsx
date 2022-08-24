import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function PageButtonsGroup(): React.ReactElement {
  return (
    <ButtonGroup
      variant="contained"
      fullWidth={false}
      color="inherit"
    >
      <Button>Prev</Button>
      <Button>Страница 1</Button>
      <Button>Next</Button>
    </ButtonGroup>
  );
}
