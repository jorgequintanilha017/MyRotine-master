var db = firebase.database();

function writeUserData(notes) {
    db.ref(`/notes/${window.user}`).set(notes);
}

function loadNotes() {
    let promisse = db.ref(`/notes/${window.user}`).once('value');
        promisse.then(function (snapshot) {
            callback(promisse, snapshotToArray(snapshot));
        });
}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });
    return returnArr;
};

function removeNote(noteId) {
    let promisse = db.ref(`/notes/${window.user}/${noteId}`);
    promisse.remove()
        .then(function () {
            console.log("Remove succeeded.");
            loadNotes();
        })
        .catch(function (error) {
            alert("Remove failed: " + error.message);
        });
}