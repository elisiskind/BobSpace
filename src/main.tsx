import './index.css';

import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
// import { createElement } from 'react';

// import App from './App';

// const logger = new Logger('purple', 'index.tsx');
//
const App = () => {
  return createElement(
    'div',
    { id: 'app' },
    createElement('h1', null, 'HOW TO REACT'),
  );
};

// const App = () => {
//   return (
//     <div id="app">
//       <h1>HOW TO REACT</h1>
//     </div>
//   );
// };

createRoot(document.getElementById('root')!).render(<App />);
