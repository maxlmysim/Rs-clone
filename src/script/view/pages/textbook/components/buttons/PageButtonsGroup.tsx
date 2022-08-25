import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { ArrowIosIconStyle, InsertDriveFileOutlinedIconStyle } from '../theme';

export default function PageButtonsGroup(): React.ReactElement {
  return (
    <ButtonGroup
      variant="contained"
      fullWidth={false}
      color="inherit"
      aria-label="outlined primary button group"
    >
      <Button>
        <ArrowBackIosNewIcon sx={ArrowIosIconStyle} />
      </Button>
      <Button>
        <InsertDriveFileOutlinedIcon sx={InsertDriveFileOutlinedIconStyle} />
        Страница 1
      </Button>
      <Button>
        <ArrowForwardIosIcon sx={ArrowIosIconStyle} />
      </Button>
    </ButtonGroup>
  );
}
