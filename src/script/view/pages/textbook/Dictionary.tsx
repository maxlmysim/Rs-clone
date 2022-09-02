import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { createTag } from '../../../helper/helper';
import { Server } from '../../../server/server';
import { WordCard } from './components/cards/Card';
import { theme } from './components/theme';
import { CSSClass } from '../../../interface/freeText';
import { TextbookController } from './controller/textbookController';
import { Word } from '../../../interface/server';

export const rootDictionary = createTag('div', CSSClass.dictionary, '');
const rootContainer = createRoot(rootDictionary as Element);
const server = new Server();
const controller = new TextbookController();

export const textbookLocation = {
  page: controller.page,
  group: controller.group,
};

const userWordIds = controller.userWords.then((json) => json.map((el) => el.wordId));

function Dictionary(): React.ReactElement {
  const [words, setWords] = useState<Word[]>([]);
  if (words.length === 0) {
    let addArr: Word[] = [];
    userWordIds.then((uWordIds) => {
      uWordIds.forEach((id) => server.getWord(id).then((el: unknown) => {
        addArr = addArr.concat(el as Word);
        setWords(addArr);
      }));
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={CSSClass.textbookWrapper}>
        <h2 className={CSSClass.textbookHeader}>Словарь</h2>
        {words.map((w) => (
          <WordCard
            word={w}
            port={server.port}
            playSounds={():void => { controller.playSounds(w); }}
            // userWords={userWords as Promise<string[]>}
            key={w.id}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}

function dictionaryRender(): void {
  rootContainer.render(
    <Dictionary />,
  );
}

export default dictionaryRender;
