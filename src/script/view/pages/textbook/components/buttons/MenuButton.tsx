import React from 'react';
import {
  Button, Menu, MenuItem, Fade,
} from '@mui/material';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import { CSSClass } from '../../../../../interface/freeText';
import { ImportContactsOutlinedIconStyle } from '../theme';

export default function MenuButton(): React.ReactElement {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div className={CSSClass.textbookMenuButtonWrapper}>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="success"
        className={CSSClass.textbookMenuButton}
      >
        <ImportContactsOutlinedIcon sx={ImportContactsOutlinedIconStyle} />
        Раздел 1
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <ImportContactsOutlinedIcon sx={ImportContactsOutlinedIconStyle} />
          Раздел 1
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ImportContactsOutlinedIcon sx={ImportContactsOutlinedIconStyle} />
          Раздел 2
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ImportContactsOutlinedIcon sx={ImportContactsOutlinedIconStyle} />
          Раздел 3
        </MenuItem>
      </Menu>
    </div>
  );
}
