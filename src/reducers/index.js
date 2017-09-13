import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import posts from './posts';

export default combineReducers({
  form: formReducer,
  post: posts,
});
