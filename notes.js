function createNoteListTemplate(note){
  return `<li data-id="${note.id}"><a href="#">${note.title}</a></li>`
}

function createNoteList(notes) {
  return notes.map(note => createNoteListTemplate(note)).join("");
}

function displayNote(note){
  noteDisplay.innerHTML = `<div data-id=${note.id}><h2>${note.title}</h2><p>${note.body}</p><br><button class="edit">Edit</button><button class="delete">Delete</button></div>`
}

function removeNote(noteID){
  let deletedNotes = document.querySelectorAll(`[data-id="${noteID}"]`)
  deletedNotes.forEach((note) => note.remove());
  noteDisplay.innerHTML = "<h2>Select a note</h2>";
}

function handleCreate(e) {
  let title = e.target.querySelector('#form-title').value
  let body = e.target.querySelector('#form-body').value

  Adapter.createNote(title, body)
  .then(resp => resp.json())
  .then(displayNote)
  .then(nothing => Adapter.getNotes())
  .then(createNoteList)
  .then(list => noteList.innerHTML = list)
}

function handleEdit(e) {
  let title = e.target.querySelector('#form-title').value
  let body = e.target.querySelector('#form-body').value
  let id = e.target.querySelector('#note-id').value

  Adapter.editNote(title, body, id)
    .then(resp => resp.json())
    .then(displayNote)
    .then(nothing => Adapter.getNotes())
    .then(createNoteList)
    .then(list => noteList.innerHTML = list)
}

function handleDelete(id){
  Adapter.deleteNote(id)
  removeNote(id)
}

function renderEditForm(id, title, body) {
  noteDisplay.innerHTML = `<form id="edit-form"><label for="form-title">Title:</label><br>
                            <textarea type="text" id="form-title">${title}</textarea><br>
                            <label for="form-body">Body:</label><br>
                            <textarea rows="4" cols="20" id="form-body">${body}</textarea>
                            <input type="hidden" id="note-id" value="${id}"<br>
                            <input type='submit'></input></form>`
}

function renderNewForm(){
  noteDisplay.innerHTML = `<form id="new-form"><label for="form-title">Title:</label><br>
                            <textarea type="text" id="form-title"></textarea><br>
                            <label for="form-body">Body:</label><br>
                            <textarea rows="4" cols="20" id="form-body"></textarea>
                            <input type='submit'></input></form>`
}
