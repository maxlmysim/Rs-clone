import React from 'react';
import {
  Button, Menu, MenuItem, Fade,
} from '@mui/material';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import { CSSClass } from '../../../../../interface/freeText';
import { ImportContactsOutlinedIconStyle } from '../theme';
import { MenuItemLength, TColors } from '../../../../../interface/textbook';

export default function MenuButton({ itemsLength }: MenuItemLength): React.ReactElement {
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
        color="inherit"
        className={CSSClass.textbookMenuButton}
        sx={{ backgroundColor: '#c5e1a5' }}
      >
        <ImportContactsOutlinedIcon sx={ImportContactsOutlinedIconStyle(0)} />
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
        {
          [...new Array(itemsLength)].map((v, i) => (
            <MenuItem key={`menu-${i + 1}`} onClick={handleClose}>
              <ImportContactsOutlinedIcon sx={ImportContactsOutlinedIconStyle(i as TColors)} />
              Раздел
              {' '}
              {i + 1}
            </MenuItem>
          ))
        }

      </Menu>
    </div>
  );
}
