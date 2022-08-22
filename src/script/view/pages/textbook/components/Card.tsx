import React from 'react';
import { Word } from '../../../../interface/server';

interface CardProps {
  word: Word,
  port: string
}

export function Card({ word, port }: CardProps): React.ReactElement {
  return (
    <div className="textbook-card">
      <img src={`${port}/${word.image}`} alt="cardcover" />
      <div className="card-content">
        <h5 className="card-content-header">{`${word.word} - ${word.transcription}`}</h5>
        <h6 className="card-content-translate">{word.wordTranslate}</h6>
        <h6 className="card-content-meaning" dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
        <h6 className="card-content-meaning-translate">{word.textMeaningTranslate}</h6>
        <h6 className="card-content-example" dangerouslySetInnerHTML={{ __html: word.textExample }} />
        <h6 className="card-content-example-translate">{word.textExampleTranslate}</h6>
      </div>
    </div>
  );
}
