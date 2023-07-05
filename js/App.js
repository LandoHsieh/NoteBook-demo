import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());
        
        this._refreshNotes();
    }

    _refreshNotes() {
        //console.log("NotesAPI.getAllNotes: ", NotesAPI.getAllNotes())
        //console.log("NotesAPI.getAllCheckedNotes", NotesAPI.getAllCheckedNotes())
        
        //console.log("NotesAPI.getAllNotes: ", NotesAPI.getAllNotes())

        const notes = NotesAPI.getAllNotes();
        console.log("notes = ", notes);
        this._setNotes(notes);
        
        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _refreshCheckedNotes() {
        const checkedNotes = NotesAPI.getAllCheckedNotes();
        this._setCheckedNotes(checkedNotes);
        if (checkedNotes.length > 0) {
            this._setActiveNote(checkedNotes[0]);
        }
    }

    _refreshDeletedNotes() {
        const deletedNotes = NotesAPI.getAllDeletedNotes();
        this._setDeletedNotes(deletedNotes);
        if(deletedNotes.length > 0){
            this._setActiveNote(deletedNotes[0]);
        }
    }

    _setNotes(notes) {
        const checkedNotes = NotesAPI.getAllCheckedNotes();
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setCheckedNotes(notes) {
        const checkedNotes = NotesAPI.getAllCheckedNotes();
        this.notes = notes;
        this.view.updateCheckedNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setDeletedNotes(notes) {
        const deletedNotes = NotesAPI.getAllDeletedNotes();
        this.notes = notes;
        this.view.updateDeletedNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {

            onNoteSelect: (noteId) => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                console.log("selectedNote = ", selectedNote);
                this._setActiveNote(selectedNote);
            },
            onCheckedNoteSelect: (noteId) => {
                const checkedNotes = NotesAPI.getAllCheckedNotes();
                //console.log("checkedNotes = ", checkedNotes);
                const selectedCheckedNote = checkedNotes.find(note => note.id == noteId);
                //console.log("selectedCheckedNote = ", selectedCheckedNote);
                this._setActiveNote(selectedCheckedNote);
            },
            onDeletedNoteSelect: (noteId) => {
                const deletedNotes = NotesAPI.getAllDeletedNotes();
                //console.log("checkedNotes = ", checkedNotes);
                const selectedDeletedNote = deletedNotes.find(note => note.id == noteId);
                //console.log("selectedCheckedNote = ", selectedCheckedNote);
                this._setActiveNote(selectedDeletedNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note",
                    body: "Take note..."
                };
                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title,
                    body
                });

                this._refreshNotes();
            },
            onNoteDelete: (noteId) => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },
            onNoteCheck: (noteId) => {
                NotesAPI.checkNote(noteId);
                this._refreshNotes();
                this._refreshCheckedNotes();
            },
            onNoteMoveToDeleted: (noteId) => {
                NotesAPI.moveNoteToDeleted(noteId);
                this._refreshNotes();
                this._refreshDeletedNotes();
            },
            onCheckedNoteMoveToDeleted: (noteId) => {
                NotesAPI.moveCheckedNoteToDeleted(noteId);
                this._refreshCheckedNotes();
                this._refreshDeletedNotes();
            },
            onNoteReturn: (noteId) => {
                NotesAPI.returnNote(noteId);
                this._refreshDeletedNotes();
                this._refreshNotes();
                
            }
        };
    }
}
