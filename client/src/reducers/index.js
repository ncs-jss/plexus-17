import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './auth.reducer';
import eventReducer from './event.reducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  event: eventReducer
});
