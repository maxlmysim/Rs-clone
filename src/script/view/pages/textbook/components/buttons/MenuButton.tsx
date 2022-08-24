import React from 'react';
import {
  Button, Menu, MenuItem, Fade,
} from '@mui/material';
// import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';

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
    <div className="menu-button-wrapper">
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="success"
        className="textbook-menu-button"
      >
        <ImportContactsOutlinedIcon sx={{ fontSize: '2rem', marginRight: '0.5rem' }} />
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
          <ImportContactsOutlinedIcon sx={{ fontSize: '2rem', marginRight: '0.5rem' }} />
          Раздел 1
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ImportContactsOutlinedIcon sx={{ fontSize: '2rem', marginRight: '0.5rem' }} />
          Раздел 2
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ImportContactsOutlinedIcon sx={{ fontSize: '2rem', marginRight: '0.5rem' }} />
          Раздел 3
        </MenuItem>
      </Menu>
    </div>
  );
}
