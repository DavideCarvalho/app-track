import { FETCH_CURSOS, SELECT_CURSO } from '../actions/cursos.js'
import _ from 'lodash';

const store = {
  grade: null,
  cursoSelecionado: null
}

export default function (state = store, action) {
  switch (action.type) {
    case FETCH_CURSOS :
      return {...state, grade: _.mapKeys(action.payload.data, 'id')};
    case SELECT_CURSO :
      return {...state, cursoSelecionado: action.payload}
    default:
      return state;
  }
}