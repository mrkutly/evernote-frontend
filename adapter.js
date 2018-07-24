const Adapter = {
  getNotes: function() {
    return fetch("http://localhost:3000/api/v1/notes").then(resp => resp.json())
  },

  getUsers: function() {
    return fetch("http://localhost:3000/api/v1/users").then(resp => resp.json())
  },

  getNote: function(noteID) {
    return fetch(`http://localhost:3000/api/v1/notes/${noteID}`).then(resp => resp.json())
  },

  deleteNote: function(noteID) {
    fetch(`http://localhost:3000/api/v1/notes/${noteID}`, {
      method: 'DELETE'
    })
  },

  editNote: function(title, body, id) {
    return fetch(`http://localhost:3000/api/v1/notes/${id}`, {
      method: 'PATCH',
      headers:  {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        body: body
      })
    })
  },

  createNote: function(title, body) {
    return fetch(`http://localhost:3000/api/v1/notes/`, {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        body: body
      })
    })
  }
}
