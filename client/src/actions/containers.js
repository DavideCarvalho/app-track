import axios from 'axios';
const ROOT_URL = 'http://localhost:8081';

export const CONTAINER_INPUT_CHANGE = 'container_input_change'
export function containerInputChange (containerId) {
  return {
    type: CONTAINER_INPUT_CHANGE,
    payload: containerId
  }
}

export const FETCH_CONTAINER = 'fetch_container'
export function fetchContainer (containerId) {
  const containerMovements = axios.get(`${ROOT_URL}/container/${containerId}`);
  return {
    type: FETCH_CONTAINER,
    payload: containerMovements
  };
}

export const ADD_CONTAINER = 'add_container'
export function addContainer (containerId) {
  const container = {
    id: containerId,
    company: "",
    containerMovements: [
    ]
  }
  return {
    type: ADD_CONTAINER,
    payload: container
  }
}