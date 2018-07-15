import React from 'react';
import { render } from 'react-dom';

import App from './App';

const docs = window.__DATA.apiDocs;

render(<App docs={docs} />, document.getElementById('root'));
