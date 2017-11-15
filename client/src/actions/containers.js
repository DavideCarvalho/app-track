import axios from 'axios';
import { createActions } from 'reduxsauce';
const ROOT_URL = 'http://localhost:8081';

export const CONTAINER_INPUT_CHANGE = 'CONTAINER_INPUT_CHANGE';
export const containerInputChange = (containerId) => (dispatch) => {
  dispatch({type: CONTAINER_INPUT_CHANGE, payload: containerId})
}

const ADD_CONTAINER = 'ADD_CONTAINER';
const addContainer = (containerId) => (dispatch) => {
  const container = {
    id: containerId,
    company: '',
    containerMovements: []
  }
  dispatch({ type: ADD_CONTAINER, payload: container });
}

const FETCH_CONTAINER = 'FETCH_CONTAINER';
const fetchContainer = (containerId, index) => async (dispatch) => {
  try {
    const containerMovements = await axios.get(`${ROOT_URL}/container/${containerId}`);
    const payload = {
      containerMovements: containerMovements.data,
      index: index
    }
    dispatch({ type: FETCH_CONTAINER, payload: payload });
  } catch (e) {
    const containerMovements = {
      id: containerId,
      company:'',
      containerMovements: null
    };
    const payload =  {
      containerMovements: containerMovements,
      index: index
    }
    dispatch({ type: FETCH_CONTAINER, payload: payload })
  }
}

export const UPDATE_CONTAINER = 'UPDATE_CONTAINER';
export const updateContainer = (containerId, index) => async (dispatch) => {
  const container = {
    index: index,
    container: {
      id: containerId,
      company: "",
      containerMovements: []
    }
  }
  dispatch({type: UPDATE_CONTAINER, payload: container})
  const containerMovements = await axios.get(`${ROOT_URL}/container/${containerId}`);
  const payload = {
    containerMovements: containerMovements.data,
    index: index
  }
  dispatch({type: FETCH_CONTAINER, payload: payload});
}

export const DELETE_CONTAINER = 'DELETE_CONTAINER';
export const deleteContainer = (index) => (dispatch) => {
  dispatch({type: DELETE_CONTAINER, payload: index});
}

const { Types, Creators } = createActions({
  containerInputChange,
  addContainer,
  fetchContainer,
  updateContainer,
  deleteContainer
}, {})

export const ContainerTypes = Types;
export default Creators;