import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTag } from '../../../helper/helper';
import { Card } from './components/Card';
import { words } from './data/words';

export const rootTextbook = createTag('div', 'textbook', '');
const rootContainer = createRoot(rootTextbook as Element);

function Textbook(): React.ReactElement {
  return (
    <div className="textbook-wrapper">
      {words.map((w) => <Card word={w} key={w.id} />)}
    </div>
  );
}

function textbookRender(): void {
  rootContainer.render(
    <Textbook />,
  );
}

export default textbookRender;
