import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/index';

// shows log of actions fired in redux in the dev console
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  collapsed: true, // auto collapse log entries
});

// create middleware as array to add future middleware functions if needed
let middleware = [promise];
// hide redux logger on production build
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}

// add redux promise middleware to store along with any additional middleware from above
// redux promise middleware will append FULFILLED, REJECTED, PENDING to api calls, see actions/reducer files
const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
};

export default configureStore;
