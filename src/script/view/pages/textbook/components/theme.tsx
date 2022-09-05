import { createTheme, SxProps, Theme } from '@mui/material';
import { ITextbookCardImageStyle, TColors } from '../../../../interface/textbook';

export const theme = createTheme({
  typography: {
    fontSize: 22,
  },
});

export const colors = {
  0: '#29b6f6',
  1: '#26a69a',
  2: '#ffa726',
  3: '#9ccc65',
  4: '#5c6bc0',
  5: '#ef5350',
};

export const textbookCardStyle: SxProps<Theme> = {
  minWidth: 275,
  height: 200,
  display: 'flex',
};

export const textbookCardImageStyle = ({ word, port }: ITextbookCardImageStyle):SxProps<Theme> => ({
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

export const ImportContactsOutlinedIconStyle = (num: TColors): SxProps<Theme> => ({
  color: colors[num],
  fontSize: '2rem',
  marginRight: '0.5rem',
});

export const ArrowIosIconStyle: SxProps<Theme> = {
  fontSize: 'small',
};

export const InsertDriveFileOutlinedIconStyle: SxProps<Theme> = {
  fontSize: '1.8rem',
  marginLeft: '-0.3rem',
  marginRight: '0.5rem',
};
