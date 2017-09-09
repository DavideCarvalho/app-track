import axios from 'axios';

export const FETCH_CURSOS = 'fetch_cursos'
export const SELECT_CURSO = 'select_curso'
const ROOT_URL = 'http://localhost:8081';

export function fetchCursos () {
  const cursos = axios.get(`${ROOT_URL}/curso`);
  return {
    type: FETCH_CURSOS,
    payload: cursos
  };
}

export function selectCurso (cursoSelecionado) {
  console.log(cursoSelecionado);
  return {
    type: SELECT_CURSO,
    payload: cursoSelecionado
  };
}