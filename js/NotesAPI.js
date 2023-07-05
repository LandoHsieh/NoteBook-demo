
export default class NotesAPI {
    static getAllNotes() {
        //notesapp-notes是一個localstorage容器 要刪內容不能用removeItem 會把整個容器刪掉
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        //排序 否則就直接 return notes();
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static getAllCheckedNotes() {
        const checkedNotes = JSON.parse(localStorage.getItem("notesapp-checkedNotes") || "[]");
        return checkedNotes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static getAllDeletedNotes() {
        const deletedNotes = JSON.parse(localStorage.getItem("notesapp-deletedNotes") || "[]");
        return deletedNotes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);
        // Edit/Update
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(noteId) {
        const notes = NotesAPI.getAllNotes();
        const deleteNote = notes.find(note => note.id == noteId);
        //刪除processing裡的note
        for(var key in notes){
            if(notes[key] == deleteNote){
                notes.splice(key, 1);
            }
        }
        localStorage.setItem("notesapp-notes", JSON.stringify(notes)); 
        console.log("note deleted!");
    }
    
    static moveNoteToDeleted(noteId) {
        const notes = NotesAPI.getAllNotes();
        const deletednotes = NotesAPI.getAllDeletedNotes();
        const deleteNote = notes.find(note => note.id == noteId);
        //新增note到deleted的localstorage內
        deletednotes.push(deleteNote);
        localStorage.setItem("notesapp-deletedNotes", JSON.stringify(deletednotes));
        //console.log("deletednotes = ", deletednotes);
    }

    static moveCheckedNoteToDeleted(noteId) {
        const checkednotes = NotesAPI.getAllCheckedNotes();
        const deletednotes = NotesAPI.getAllDeletedNotes();
        const deleteNote = checkednotes.find(note => note.id == noteId);
        //新增checked note到deleted的localstorage內
        deletednotes.push(deleteNote);
        localStorage.setItem("notesapp-deletedNotes", JSON.stringify(deletednotes));
        //console.log("deletednotes = ", deletednotes);
    }
/*
    static moveNoteToDeleted(noteId){
        const notes = NotesAPI.getAllNotes();
        var node = document.querySelectorAll("[data-note-id]");
        var deletenote = "";
        var count = 0;
        node.forEach(nodeElement => {
            if(nodeElement.dataset.noteId == noteId){
                //document.getElementById("deleted-tab").appendChild(nodeElement);
                count = count;
            }
            else{
                count++;
            }
        })
        document.getElementById("deleted-tab").appendChild(node[count]);
        console.log("deleteNote = ", deletenote);
        
        //document.getElementById("processing-tab").removeChild(deletenote);
    }
*/
    static checkNote(noteId){
        const notes = NotesAPI.getAllNotes();
        const checkedNotes = NotesAPI.getAllCheckedNotes();
        const checkNote = notes.find(note => note.id == noteId);
        checkedNotes.push(checkNote);
        localStorage.setItem("notesapp-checkedNotes", JSON.stringify(checkedNotes));
        //console.log("checkedNote = ", checkedNotes);
    }

    static returnNote(noteId){
        const notes = NotesAPI.getAllNotes();
        const deletednotes = NotesAPI.getAllDeletedNotes();
        //console.log("deletednotes before return =", deletednotes);
        //console.log("notes before push = ", notes);
        const returnnote = deletednotes.find(note => note.id == noteId);
        notes.push(returnnote);
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
        console.log("notes after push = ", notes);
        
        for(var key in deletednotes){
            if(deletednotes[key] == returnnote){
                deletednotes.splice(key, 1);
            }
        }
        localStorage.setItem("notesapp-deletedNotes", JSON.stringify(deletednotes)); 
        //console.log("deletednotes after return = ", deletednotes);
        
        
    }
    
}
