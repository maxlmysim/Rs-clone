import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Word } from '../../../../../interface/server';

interface CardProps {
  word: Word,
  port: string
}

export function WordCard({ word, port }: CardProps): React.ReactElement {
  return (
    <Card sx={{
      minWidth: 275, height: 200, display: 'flex',
    }}
    >
      <Box sx={{
        height: 1,
        width: 300,
        backgroundImage: `url(${port}/${word.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      />
      <CardContent sx={{ width: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {`${word.word} - ${word.transcription}`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {word.wordTranslate}
        </Typography>
        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
        <Typography variant="body2" color="text.secondary">{word.textMeaningTranslate}</Typography>
        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: word.textExample }} />
        <Typography variant="body2" color="text.secondary">{word.textExampleTranslate}</Typography>
      </CardContent>
    </Card>

  );
}
