import React, { useEffect, useState } from 'react';
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

function Dictionary(): React.ReactElement {
  const [words, setWords] = useState<Word[]>([]);
  const [dictCount, setCount] = useState<number>(0);

  useEffect((): void => {
    async function getUserWordsIds(): Promise<void> {
      const userWordIds = controller.userWords.then((json) => json.map((el) => el.wordId));
      let addArr: Word[] = [];
      userWordIds.then((uWordIds) => {
        uWordIds.forEach((id) => server.getWord(id).then((el: unknown) => {
          addArr = addArr.concat(el as Word);
          setWords(addArr);
        }));
      });
    }
    getUserWordsIds();
  }, [setWords, setCount]);
  return (
    <ThemeProvider theme={theme}>
      <div className={CSSClass.textbookWrapper}>
        <h2 className={CSSClass.textbookHeader}>Словарь</h2>
        {words.map((w) => (
          <WordCard
            word={w}
            port={server.port}
            playSounds={():void => { controller.playSounds(w); }}
            key={w.id}
            hardBtnRemove={(): void => {
              controller.removeHardWord(w);
              setWords(words.filter((word) => word !== w));
              setCount(dictCount - 1);
            }}
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
