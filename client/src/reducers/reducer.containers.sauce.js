import { ContainerTypes } from '../actions/containers';
import { createReducer } from 'reduxsauce'
import update from 'immutability-helper';
import _ from 'lodash';

const INITIAL_STATE = {
  containerInput: '',
  containers: [
  ]
}

const containerInputChange = (state = INITIAL_STATE, action) => {
  return { 
    ...state, 
    containerInput: state.containerInput = action.payload
  }
}

const addContainer = (state = INITIAL_STATE, action) => {
  const containerInput = '';
  return { 
    ...state,
    containerInput: state.containerInput = containerInput,
    containers: [ ...state.containers, action.payload ],
  }
};

const fetchContainer = (state = INITIAL_STATE, action) => {
  return update(state, { 
    containers: { 
      [action.payload.index]: {$set: action.payload.containerMovements}
    }
  })
}

const resetContainer = (state = INITIAL_STATE, action) => {
  return update(state, { 
    containers: { 
      [action.payload.index]: {$set: action.payload.container}
    }
  })
};

const deleteContainer = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    containers: _.filter(state.containers, (container, index) => index !== action.payload)
  }
}

const HANDLERS = {
  [ContainerTypes.CONTAINER_INPUT_CHANGE]: containerInputChange,
  [ContainerTypes.ADD_CONTAINER]: addContainer,
  [ContainerTypes.FETCH_CONTAINER]: fetchContainer,
  [ContainerTypes.UPDATE_CONTAINER]: resetContainer,
  [ContainerTypes.DELETE_CONTAINER]: deleteContainer
}

export default createReducer(INITIAL_STATE, HANDLERS)

