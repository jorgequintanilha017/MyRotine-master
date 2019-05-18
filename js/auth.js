function signUp(txtEmail, txtPassword) {
    const promise = firebase.auth().createUserWithEmailAndPassword(txtEmail.value, txtPassword.value);
    promise.catch((e) => {
        alert(e.message);
    });
}

function loginWithEmail(txtEmail, txtPassword) {
    const promise = firebase.auth().signInWithEmailAndPassword(txtEmail.value, txtPassword.value);
    promise.catch((e) => {
        alert(e.message);
    });
}

function signOut() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        formLogin.classList.add('d-none');
        dashboard.classList.remove('d-none');
        firstHeader.classList.add('d-none');
        console.log('Logged');
        window.user = firebase.auth().currentUser.uid;
        loadNotes();
    } else {
        formLogin.classList.remove('d-none');
        dashboard.classList.add('d-none');
        firstHeader.classList.remove('d-none');
        console.log('Not logged');
    }

});