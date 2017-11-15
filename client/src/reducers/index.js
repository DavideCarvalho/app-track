import { combineReducers } from 'redux';
// import ContainerReducer from './reducer_containers';
import ContainerReducer from './reducer.containers.sauce';

const rootReducer = combineReducers({
  //container: ContainerReducer,
  container: ContainerReducer
});

export default rootReducer;