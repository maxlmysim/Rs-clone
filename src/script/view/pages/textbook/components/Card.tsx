import React from 'react';
import { Word } from '../../../../interface/server';
import { config } from '../config';

interface CardProps {
  word: Word,
}

export function Card({ word }: CardProps): React.ReactElement {
  return (
    <div className="textbook-card">
      <img src={`${config.serverUrl}${word.image}`} alt="cardcover" />
      <div className="card-content">
        <h5 className="card-content-header">{`${word.word} - ${word.transcription}`}</h5>
        <h6 className="card-content-translate">{word.wordTranslate}</h6>
        <h6 className="card-content-meaning">{word.textMeaning}</h6>
        <h6 className="card-content-meaning-translate">{word.textMeaningTranslate}</h6>
        <h6 className="card-content-example">{word.textExample}</h6>
        <h6 className="card-content-example-translate">{word.textExampleTranslate}</h6>
      </div>
    </div>
  );
}
