const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const formLogin = document.getElementById('formLogin');
const dashboard = document.getElementById('dashboard');
const firstHeader = document.getElementById('firstHeader');
const userName = document.getElementById('user-name');
const newNote = document.getElementById('newNote');
const btnSaveNote = document.getElementById('saveNote');
const inputName = document.getElementById('inputName');
const inputCategory = document.getElementById('inputCategory');
const inputAddress = document.getElementById('inputAddress');
const inputNote = document.getElementById('inputNote');
let date = new Date();
const notesDiv = document.getElementById('notes');
let notes = new Array();

btnLogin.addEventListener('click', () => {
    loginWithEmail(txtEmail, txtPassword);
    notesDiv.innerHTML = '';
});

btnSignUp.addEventListener('click', () => {
    signUp(txtEmail, txtPassword);

});

btnSignOut.addEventListener('click', () => {
    signOut();
});

btnSaveNote.addEventListener('click', () => {
    addNote();
    writeUserData(notes);
});

function addNote() {
    date = new Date();
    note = {
        name: inputName.value,
        body: inputNote.value,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        category: inputCategory.children[inputCategory.selectedIndex].textContent,
        noteId: notes.length
    }
    
    notes.push(note);
    addHTML();
}

function addHTML() {
    let noteHTML = '';
    notes.forEach((note) => {
        noteHTML += `
    <div class="col-md-6 mt-4">
        <div class="card-group">
            <div class="card">
                <div class="card-header">
                        ${note.name}
                        <button onclick= "removeNote(${note.noteId})" type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                        <div class="card-body">
                            <p class="card-text">${note.body}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">This note was created in ${note.day}/${note.month}/${note.year}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    });
    notesDiv.innerHTML = noteHTML;
    inputName.value = '';
    inputCategory.value = 0;
    inputNote.value = '';

}

function callback(promisse, snapshot) {
    promisse.then(() => {
        notes = new Array();
        if (snapshot != null) {
            notes = snapshot;
        }
        if (notes != null) {
            addHTML();
        }
    });
}