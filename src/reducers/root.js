/**
 * Root reducer for passing parts of the state tree to their
 * respective reducers.
 *
 * @author mtownsend
 * @since Oct 2017
 **/

import { combineReducers } from 'redux'
import splash from './splash';

export default combineReducers({
  splash
});