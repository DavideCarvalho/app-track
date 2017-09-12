import { FETCH_CONTAINER, ADD_CONTAINER, CONTAINER_INPUT_CHANGE } from '../actions/containers.js'
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
      let payloadId = "";
      for(let i = 0; i < state.containers; i++) {
        if (state.containers[i].id === action.payload.data.id) {
          payloadId = i;
          break;
        }
      }
      return {
        ...state,
        containers: [
          ...state.containers[payloadId],
          action.payload.data
        ]
      }
    default:
      return state;
  }
}