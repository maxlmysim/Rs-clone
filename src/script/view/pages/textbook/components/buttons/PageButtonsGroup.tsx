import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Menu, MenuItem, Fade } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { ArrowIosIconStyle, InsertDriveFileOutlinedIconStyle } from '../theme';
import { IPageButtonsGroup } from '../../../../../interface/textbook';
import { CSSClass } from '../../../../../interface/freeText';
import { textbookLocation } from '../../Textbook';

export default function PageButtonsGroup(
  {
    pagesLength, updateWords, buttonText, setButtonText,
  }
  : IPageButtonsGroup,
):
  React.ReactElement {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.currentTarget.className.includes('page-')) {
      const pageNum = (Number(event.currentTarget.innerText.match(/\d+/g)) - 1);
      updateWords(textbookLocation.group, pageNum);
      console.log(textbookLocation);
      setButtonText(event.currentTarget.innerText);
    }
    setAnchorEl(null);
  };

  const changePage = (event: React.MouseEvent<HTMLElement>): void => {
    const pageNum = textbookLocation.page;

    if (event.currentTarget.className.includes('textbook-prev-page')
        && pageNum > 0) {
      updateWords(textbookLocation.group, pageNum - 1);
      setButtonText(`Страница ${pageNum}`);
    }
    if (event.currentTarget.className.includes('textbook-next-page')
        && pageNum < (pagesLength - 1)) {
      updateWords(textbookLocation.group, pageNum + 1);
      setButtonText(`Страница ${pageNum + 2}`);
    }
  };

  return (
    <ButtonGroup
      variant="contained"
      fullWidth={false}
      color="inherit"
      aria-label="outlined primary button group"
    >
      <Button
        className="textbook-prev-page"
        onClick={changePage}
      >
        <ArrowBackIosNewIcon sx={ArrowIosIconStyle} />
      </Button>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="inherit"
        className={CSSClass.textbookMenuButton}
      >
        <InsertDriveFileOutlinedIcon sx={InsertDriveFileOutlinedIconStyle} />
        {buttonText}
      </Button>
      <Menu
        className="textbook-pages-menu"
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {
          [...new Array(pagesLength)].map((v, i) => (
            <MenuItem className={`page-${i + 1}`} key={`page-${i + 1}`} onClick={handleClose}>
              <InsertDriveFileOutlinedIcon sx={InsertDriveFileOutlinedIconStyle} />
              Страница
              {' '}
              {i + 1}
            </MenuItem>
          ))
        }

      </Menu>
      <Button
        className="textbook-next-page"
        onClick={changePage}
      >
        <ArrowForwardIosIcon sx={ArrowIosIconStyle} />
      </Button>
    </ButtonGroup>
  );
}
