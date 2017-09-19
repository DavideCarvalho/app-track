import axios from 'axios';
const ROOT_URL = 'http://localhost:8081';

export const CONTAINER_INPUT_CHANGE = 'container_input_change';
export const containerInputChange = (containerId) => (dispatch) => {
  dispatch({type: CONTAINER_INPUT_CHANGE, payload: containerId})
  return Promise.resolve('funcionou')
}

export const FETCH_CONTAINER = 'fetch_container';
export const fetchContainer = (containerId, index) => async (dispatch) => {
  const containerMovements = await axios.get(`${ROOT_URL}/container/${containerId}`);
  const payload = {
    containerMovements: containerMovements.data,
    index: index
  }
  dispatch({type: FETCH_CONTAINER, payload: payload});
}

export const DELETE_CONTAINER = 'delete_container';
export const deleteContainer = (index) => (dispatch) => {
  dispatch({type: DELETE_CONTAINER, payload: index});
}

export const RESET_CONTAINER = 'reset_container';
export const UPDATE_CONTAINER = 'update_container';
export const updateContainer = (containerId, index) => async (dispatch) => {
  const container = {
    index: index,
    container: {
      id: containerId,
      company: "",
      containerMovements: []
    }
  }
  dispatch({type: RESET_CONTAINER, payload: container})
  const containerMovements = await axios.get(`${ROOT_URL}/container/${containerId}`);
  const payload = {
    containerMovements: containerMovements.data,
    index: index
  }
  dispatch({type: FETCH_CONTAINER, payload: payload});
}

export const ADD_CONTAINER = 'add_container';
export function addContainer(containerId) {
  const container = {
    id: containerId,
    company: "",
    containerMovements: []
  }
  return {type: ADD_CONTAINER, payload: container}
}