import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createTag } from '../../../helper/helper';
import { Server } from '../../../server/server';
import { Card } from './components/Card';
import { Word } from '../../../interface/server';

export const rootTextbook = createTag('div', 'textbook', '');
const rootContainer = createRoot(rootTextbook as Element);
const server = new Server();

function Textbook(): React.ReactElement {
  const [words, setWords] = useState<Word[]>([]);
  server.getAllWords().then((json) => setWords(json));

  return (
    <div className="textbook-wrapper">
      {words.map((w) => <Card word={w} port={server.port} key={w.id} />)}
    </div>
  );
}

function textbookRender(): void {
  rootContainer.render(
    <Textbook />,
  );
}

export default textbookRender;
