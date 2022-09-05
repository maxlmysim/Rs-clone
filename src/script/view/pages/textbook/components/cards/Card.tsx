import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { CSSClass } from '../../../../../interface/freeText';
import { textbookCardStyle, textbookCardImageStyle, textbookCardContentStyle } from '../theme';
import { CardProps } from '../../../../../interface/textbook';
import CardButtonsGroup from '../buttons/CardButtonsGroup';
import { userInfo } from '../../../../../authorization/user';

export function WordCard({
  word, port, playSounds, hardBtnSet, hardBtnRemove, userWords,
}: CardProps): React.ReactElement {
  return (
    <Card
      className={CSSClass.textbookCard}
      sx={textbookCardStyle}
    >
      <Box
        className={CSSClass.textbookCardImage}
        sx={textbookCardImageStyle({ word, port })}
      />
      <CardContent
        className={CSSClass.textbookCardContent}
        sx={textbookCardContentStyle}
      >
        <Typography gutterBottom variant="h5" component="div">
          {`${word.word} - ${word.transcription}`}
          <IconButton
            className="card--play-sound"
            aria-label="play sound"
            size="small"
            sx={{ marginBottom: '0.4rem', marginLeft: '0.5rem' }}
            onClick={():void => { playSounds(word); }}
          >
            <VolumeUpIcon fontSize="small" />
          </IconButton>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {word.wordTranslate}
        </Typography>
        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
        <Typography variant="body2" color="text.secondary">{word.textMeaningTranslate}</Typography>
        <Box className={CSSClass.textbookCardDelimeter} />
        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: word.textExample }} />
        <Typography variant="body2" color="text.secondary">{word.textExampleTranslate}</Typography>
      </CardContent>
      {userInfo.login && (
      <CardButtonsGroup
        word={word}
        userWords={userWords}
        hardBtnSet={hardBtnSet}
        hardBtnRemove={hardBtnRemove}
      />
      )}
    </Card>

  );
}
