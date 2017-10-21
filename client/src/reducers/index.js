import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import eventsReducer from './eventsReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  events: eventsReducer
});
