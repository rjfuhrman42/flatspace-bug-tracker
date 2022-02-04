import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {
  user: null,
  error: null,
  loading: true,
}

export const GlobalContext = createContext(initialState)

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // Actions
  async function registerUser(username, password) {
    try {
      const response = await axios.post('/api/v1/register', { username, password }, config)
      console.log('here!!', response.data)
      dispatch({
        type: 'REGISTER_USER',
        payload: response.data.data,
      })
    } catch (err) {
      dispatch({
        type: 'REGISTER_ERROR',
        payload: err.response.data,
      })
    }
  }

  async function login(username, password) {
    try {
      const response = await axios.post('/api/v1/login', { username, password }, config)

      dispatch({
        type: 'LOGIN',
        payload: response.data.data,
      })
    } catch (err) {
      console.error(err.response.data)
      dispatch({
        type: 'LOGIN_ERROR',
        payload: undefined,
      })
    }
  }

  function logout(username) {
    dispatch({
      type: 'LOGOUT',
      payload: { username },
    })
  }

  return (
    <GlobalContext.Provider value={{ user: state.user, registerUser, login, logout }}>
      {children}
    </GlobalContext.Provider>
  )
}
