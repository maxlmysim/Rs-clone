import React from 'react';
import {
  Button, Menu, MenuItem, Fade,
} from '@mui/material';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import { CSSClass } from '../../../../../interface/freeText';
import { ImportContactsOutlinedIconStyle } from '../theme';
import {
  IMenuButton, TColors,
} from '../../../../../interface/textbook';

export default function MenuButton({ itemsLength, updateWords, setPageButtonText }: IMenuButton): React.ReactElement {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [buttonText, setButtonText] = React.useState<string>('Раздел 1');
  const open = Boolean(anchorEl);
  const colorNumber = (Number(buttonText.match(/[1-6]/g)) - 1);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.currentTarget.className.includes('MuiMenuItem-root')) {
      const groupNum = (Number(event.currentTarget.innerText.match(/[0-9]/g)) - 1);
      updateWords(groupNum, 0);
      setPageButtonText('Страница 1');
      setButtonText(event.currentTarget.innerText);
    }
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
        <ImportContactsOutlinedIcon
          sx={ImportContactsOutlinedIconStyle(colorNumber as TColors)}
        />
        {buttonText}
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
