import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTag } from '../../helper/helper';
import { Card } from './components/Card';
import { words } from './data/words';

const root = createTag('div', 'textbook', '');
document.body.appendChild(root);
const rootContainer = createRoot(root as Element);

function Textbook(): React.ReactElement {
  return (
    <div className="textbook-wrapper">
      <Card word={words[0]} />
    </div>
  );
}

function textbookRender(): void {
  rootContainer.render(
    <Textbook />,
  );
}

export default textbookRender;
