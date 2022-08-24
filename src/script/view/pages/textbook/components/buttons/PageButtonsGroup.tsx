import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

export default function PageButtonsGroup(): React.ReactElement {
  return (
    <ButtonGroup
      variant="contained"
      fullWidth={false}
      color="inherit"
      aria-label="outlined primary button group"
    >
      <Button>
        <ArrowBackIosNewIcon sx={{ fontSize: 'small' }} />
      </Button>
      <Button>
        <InsertDriveFileOutlinedIcon sx={{ fontSize: '1.8rem', marginLeft: '-0.3rem', marginRight: '0.5rem' }} />
        Страница 1
      </Button>
      <Button>
        <ArrowForwardIosIcon sx={{ fontSize: 'small' }} />
      </Button>
    </ButtonGroup>
  );
}
