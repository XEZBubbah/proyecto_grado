import {combineReducers} from 'redux';

import auth from './auth';
import users from './users';
import reports from './reports';

export const reducers = combineReducers({ auth, users, reports });