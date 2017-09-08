import { combineReducers } from 'redux';
import CursosReducer from './reducer_cursos.js';

const rootReducer = combineReducers({
  cursos: CursosReducer
});

export default rootReducer;