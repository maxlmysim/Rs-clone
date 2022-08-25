import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { createTag } from '../../../helper/helper';
import { Server } from '../../../server/server';
import { WordCard } from './components/cards/Card';
import TextbookButtonsGroup from './components/buttons/TextbookButtonsGroup';
import { Word } from '../../../interface/server';
import { theme } from './components/theme';
import { CSSClass } from '../../../interface/freeText';

export const rootTextbook = createTag('div', CSSClass.textbook, '');
const rootContainer = createRoot(rootTextbook as Element);
const server = new Server();

function Textbook(): React.ReactElement {
  const [words, setWords] = useState<Word[]>([]);
  server.getAllWords().then((json) => setWords(json));

  return (
    <ThemeProvider theme={theme}>
      <div className={CSSClass.textbookWrapper}>
        <TextbookButtonsGroup />
        {words.map((w) => <WordCard word={w} port={server.port} key={w.id} />)}
      </div>
    </ThemeProvider>
  );
}

function textbookRender(): void {
  rootContainer.render(
    <Textbook />,
  );
}

export default textbookRender;
