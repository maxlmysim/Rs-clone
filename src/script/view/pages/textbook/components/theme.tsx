import { createTheme, SxProps, Theme } from '@mui/material';
import { CardProps } from '../../../../interface/textbook';

export const theme = createTheme({
  typography: {
    fontSize: 22,
  },
});

export const textbookCardStyle: SxProps<Theme> = {
  minWidth: 275,
  height: 200,
  display: 'flex',
};

export const textbookCardImageStyle = ({ word, port }: CardProps):SxProps<Theme> => ({
  height: 1,
  width: 300,
  backgroundImage: `url(${port}/${word.image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

export const textbookCardContentStyle: SxProps<Theme> = {
  width: 1,
};

export const ImportContactsOutlinedIconStyle: SxProps<Theme> = {
  fontSize: '2rem',
  marginRight: '0.5rem',
};

export const ArrowIosIconStyle: SxProps<Theme> = {
  fontSize: 'small',
};

export const InsertDriveFileOutlinedIconStyle: SxProps<Theme> = {
  fontSize: '1.8rem',
  marginLeft: '-0.3rem',
  marginRight: '0.5rem',
};
