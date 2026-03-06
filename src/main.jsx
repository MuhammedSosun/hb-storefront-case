import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
  <StrictMode>
      <App />
  </StrictMode>
  </Provider>
);