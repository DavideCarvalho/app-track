import { FETCH_CONTAINER, ADD_CONTAINER, CONTAINER_INPUT_CHANGE, DELETE_CONTAINER, RESET_CONTAINER } from '../actions/containers.js'
import update from 'immutability-helper';
import _ from 'lodash';
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
      return update(state, { 
        containers: { 
          [action.payload.index]: {$set: action.payload.containerMovements}
        }
      })
    case DELETE_CONTAINER:
      return {
        ...state,
        containers: _.filter(state.containers, (container, index) => index !== action.payload)
      }
    case RESET_CONTAINER:
    return update(state, { 
      containers: { 
        [action.payload.index]: {$set: action.payload.container}
      }
    })
    default:
      return state;
  }
}