import { combineReducers } from 'redux';
import ContainerReducer from './reducer_containers';

const rootReducer = combineReducers({
  container: ContainerReducer
});                                   

export default rootReducer;