import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { createTag } from '../../../helper/helper';
import { Server } from '../../../server/server';
import { WordCard } from './components/cards/Card';
// import MenuButton from './components/buttons/MenuButton';
// import PageButtonsGroup from './components/buttons/PageButtonsGroup';
import TextbookButtonsGroup from './components/buttons/TextbookButtonsGroup';
import { Word } from '../../../interface/server';
import { theme } from './components/theme';

export const rootTextbook = createTag('div', 'textbook', '');
const rootContainer = createRoot(rootTextbook as Element);
const server = new Server();

function Textbook(): React.ReactElement {
  const [words, setWords] = useState<Word[]>([]);
  server.getAllWords().then((json) => setWords(json));

  return (
    <ThemeProvider theme={theme}>
      <div className="textbook-wrapper">
        {/* <MenuButton />
        <PageButtonsGroup /> */}
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
