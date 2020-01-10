import axios from 'axios';
import { reset } from 'redux-form';
import history from '../components/history';
import { GET_TODOS, GET_TODO, ADD_TODO, DELETE_TODO, EDIT_TODO } from './types';

const BASE_URL = 'http://127.0.0.1:8000/api/todo/';

// GET TODOS
export const getTodos = () => async dispatch => {
  const res = await axios.get(BASE_URL);
  dispatch({
    type: GET_TODOS,
    payload: res.data
  });
};

// GET TODO
export const getTodo = id => async dispatch => {
  const res = await axios.get(BASE_URL + `${id}/`);
  dispatch({
    type: GET_TODO,
    payload: res.data
  });
};

// ADD TODO
export const addTodo = formValues => async dispatch => {
  const res = await axios.post(BASE_URL, { ...formValues });
  dispatch({
    type: ADD_TODO,
    payload: res.data
  });
  dispatch(reset('todoForm'));
};

// DELETE TODO
export const deleteTodo = id => async dispatch => {
  await axios.delete(BASE_URL + `${id}/`);
  dispatch({
    type: DELETE_TODO,
    payload: id
  });
  history.push('/');
};

// EDIT TODO
export const editTodo = (id, formValues) => async dispatch => {
  const res = await axios.patch(BASE_URL + `${id}/`, formValues);
  dispatch({
    type: EDIT_TODO,
    payload: res.data
  });
  history.push('/');
};
