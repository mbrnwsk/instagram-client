import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import configureStore from './stores';
//import App from './containers/App';
import Main from './components/Main';
import ImageList from './components/ImageList';
import ImageDetails from './components/ImageDetails';
import * as imageActions from './actions/ImageActions';
import * as tagActions from './actions/TagActions';

const store = configureStore();

console.log(store.getState());
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(imageActions.fetchImages());
store.dispatch(tagActions.setTags(["audi", "bmw", "mercedez"]));

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={ImageList}/>
        <Route path="tag" component={ImageList}/>
        <Route path="image" component={ImageDetails}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
