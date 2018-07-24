const noteList = document.querySelector('#note-list')
const noteDisplay = document.querySelector('#note-display')
const newNoteButton = document.querySelector('#new')

Adapter.getNotes().then(createNoteList).then(list => noteList.innerHTML = list)

noteList.addEventListener('click', function(e) {
  if (e.target.tagName === 'A'){
    let id = e.target.parentElement.dataset.id
    Adapter.getNote(id).then(displayNote)
  }
})

noteDisplay.addEventListener('click', function(e){
  let note = e.target.parentElement
  let noteID = note.dataset.id

  if (e.target.className === 'delete'){
    handleDelete(noteID)
  } else if (e.target.className === 'edit'){
    let noteBody = note.querySelector('p').innerText
    let noteTitle = note.querySelector('h2').innerText
    renderEditForm(noteID, noteTitle, noteBody)
  }
})

noteDisplay.addEventListener('submit', function(e) {
  e.preventDefault()
  if (e.target.id === 'edit-form'){
    handleEdit(e)
  } else if (e.target.id === 'new-form'){
    handleCreate(e)
  }
})

newNoteButton.addEventListener('click', function(e) {
  renderNewForm()
})
