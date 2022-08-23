import React from 'react';
import {
  Button, Menu, MenuItem, Fade,
} from '@mui/material';

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
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="success"
      >
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
        <MenuItem onClick={handleClose}>Раздел 1</MenuItem>
        <MenuItem onClick={handleClose}>Раздел 2</MenuItem>
        <MenuItem onClick={handleClose}>Раздел 3</MenuItem>
      </Menu>
    </div>
  );
}
