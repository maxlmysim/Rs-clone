import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Textbook from './Textbook';

const rootContainer = createRoot(document.getElementById('root') as Element);
function textbookRender(): void {
  rootContainer.render(<Textbook />);
}

export default textbookRender;
