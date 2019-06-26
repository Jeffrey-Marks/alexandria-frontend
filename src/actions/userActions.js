export function fetchUser() {
  return dispatch => {
    return fetch("http://localhost:3000/profile", {
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(r => r.json())
      .then(user => {
        if (user.id) {
          dispatch({ type: "ADD_USER", user })
          dispatch({ type: "LOG_IN" })
        }
      })
  }
}

export function loginUser({ username, password }) {
  return dispatch => {
    return fetch("http://localhost:3000/login", {
    	method: "POST",
    	headers: { 'Content-Type': 'application/json' },
    	body: JSON.stringify({ username, password })
    }).then(r => r.json())
    	.then(data => {
        console.log(data)
        if (data.user) {
          localStorage.setItem("token", data.token)
          dispatch({ type: "ADD_USER", user: data.user })
          dispatch({ type: "LOG_IN" })
        }
      })
  }
}

export const logoutUser = () => {
  return { type: "LOG_OUT" }
}

export function signupUser({ username, password, passwordConfirm }) {
  return dispatch => {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, passwordConfirm })
    }).then(r => r.json())
      .then(data => {
        if (data.user) {
          localStorage.setItem("token", data.token)
          dispatch({ type: "ADD_USER", user: data.user })
          dispatch({ type: "LOG_IN" })
        }
      })
  }
}

export function favoriteDeck(user_id, deck_id) {
  return dispatch => {
    // console.log(user_id, deck_id);
    return fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, deck_id })
    })
      .then(r => r.json())
      .then(user => dispatch({ type: "ADD_USER", user }))
  }
}

export function unfavoriteDeck(user_id, deck_id) {
  return dispatch => {
    // console.log(id);
    return fetch(`http://localhost:3000/favorites/${user_id}/${deck_id}`, { method: "DELETE" })
      .then(r => r.json())
      .then(user => dispatch({ type: "ADD_USER", user }))
  }
}
