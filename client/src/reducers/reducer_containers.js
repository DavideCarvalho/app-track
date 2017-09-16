import { FETCH_CONTAINER, ADD_CONTAINER, CONTAINER_INPUT_CHANGE } from '../actions/containers.js'
import update from 'immutability-helper';

const store = {
  containerInput: "",
  containers: [
  ]
}

export default function (state = store, action) {
  switch (action.type) {
    case CONTAINER_INPUT_CHANGE :
     return { 
       ...state, 
       containerInput: state.containerInput = action.payload}
    case ADD_CONTAINER :
      const containerInput = "";
      return { 
        ...state,
        containerInput: state.containerInput = containerInput,
        containers: [ ...state.containers, action.payload ],
      }
    case FETCH_CONTAINER:
    console.log(action.payload)
      return update(state, { 
        containers: { 
          [action.payload.index]: {$set: action.payload.containerMovements}
        }
      })
    default:
      return state;
  }
}