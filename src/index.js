import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
<ApolloProvider client={client}>
   <App />
</ApolloProvider>,
    document.getElementById('root')
);
//serviceWorker.unregister();
if (module.hot) module.hot.accept();