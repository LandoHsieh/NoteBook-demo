import NotesAPI from "./NotesAPI.js";
export default class NotesView {
    constructor(root, { onNoteSelect, onCheckedNoteSelect, onDeletedNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete, onNoteCheck, onNoteMoveToDeleted, onNoteReturn, onCheckedNoteMoveToDeleted } = {}) {
        this.root = root;
        this.onCheckedNoteMoveToDeleted = onCheckedNoteMoveToDeleted;
        this.onNoteReturn = onNoteReturn;
        this.onDeletedNoteSelect = onDeletedNoteSelect;
        this.onNoteMoveToDeleted = onNoteMoveToDeleted;
        this.onCheckedNoteSelect = onCheckedNoteSelect;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="icon">
                    <i id="trashIcon" class="bi bi-trash3"></i>
                    <i id="checkIcon" class="bi bi-check-circle"></i>
                    <i id="returnIcon" class="bi bi-reply hide"></i>

                </div>
                
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <button id="tab-processing" class="nav-link active" >Processing</button>
                    </li>
                    <li class="nav-item">
                        <!--<a class="nav-link" role="tab" href="#completed" data-bs-toggle="tab">Completed</a>-->
                        <button id="tab-completed" class="nav-link">Completed</button>
                    </li>
                    <li class="nav-item">
                        <!--<a class="nav-link" role="tab" href="#deleted" data-bs-toggle="tab">Deleted</a>-->
                        <button id="tab-deleted" class="nav-link">Deleted</button>
                    </li>
                </ul>
            
                <div class="tab-content">
                <!--
                    <div class="notes__list">
                        <div class="tab-pane fade in active show" id="processing"></div>
                        <div class="tab-pane fade in" id="completed"></div>
                        <div class="tab-pane fade in" id="deleted"></div>
                    </div>
                -->
                    <div class="tab-pane fade in active show" id="processing-tab"></div>
                    <div class="tab-pane fade in" id="completed-tab"></div>
                    <div class="tab-pane fade in" id="deleted-tab"></div>
                </div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New Note...">
                <textarea class="notes__body">Take note...</textarea>
            </div>
        `;
        
        localStorage.removeItem("notesapp-notes");
        localStorage.removeItem("notesapp-checkedNotes");
        localStorage.removeItem("notesapp-deletedNotes");

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");
        const btnDeleteNote = this.root.querySelector("#trashIcon");
        const btnDeleteNoteFill = this.root.querySelector(".bi-trash3-fill");
        const btnCheckNote = this.root.querySelector(".bi-check-circle");
        const btnReturnNote = this.root.querySelector("#returnIcon")
        const icon = this.root.querySelector(".icon");
        const filters = this.root.querySelectorAll(".nav-item");

        var notesListContainer = this.root.querySelector(".tab-pane");
        var deletedListContainer = this.root.querySelector("#deleted-tab");
        var trashIcon =  document.getElementById("trashIcon").getAttribute("class");
        var trashIconId = document.getElementById("trashIcon");
        var checkIcon = document.getElementById("checkIcon").getAttribute("class");
        var checkIconId = document.getElementById("checkIcon");
        var returnIcon = document.getElementById("returnIcon").getAttribute("class");
        var returnIconId = document.getElementById("returnIcon");
        var processing = document.getElementById("processing-tab");
        var completed = document.getElementById("completed-tab");
        var deleted = document.getElementById("deleted-tab");
        
        //將btnDeleteNote寫在constructor可能會抓不到 必須寫在noteadd被渲染之後
        
        //this.root.querySelector(".bi-trash3").style.visibility = "hidden";
        icon.style.visibility = 'hidden';

        btnAddNote.addEventListener("click", () => {
            icon.style.visibility = "visible";
            this.onNoteAdd();
        });
        //console.log("NotesAPI.getAllNotes().length: ",NotesAPI.getAllNotes().length);
        btnDeleteNote.addEventListener("click", function(e){
            //if(processing.classList.contains("active")){
                if(NotesAPI.getAllNotes().length == 0){
                    alert("No note can delete!");
                }
                else{
                    if(!trashIconId.classList.contains('bi-trash3-fill')){
                        trashIcon = trashIcon.replace("bi bi-trash3", "bi bi-trash3-fill");
                        document.getElementById("trashIcon").setAttribute("class", trashIcon);
                        console.log("choose a note to delete!");
                        //選擇要刪除的note
                        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
                            noteListItem.addEventListener("click", () => {
                                onNoteSelect(noteListItem.dataset.noteId);
                                //console.log("noteListItem = ", noteListItem);
                                onNoteMoveToDeleted(noteListItem.dataset.noteId);
                                onNoteDelete(noteListItem.dataset.noteId);
                                trashIcon = trashIcon.replace("bi bi-trash3-fill", "bi bi-trash3");
                                document.getElementById("trashIcon").setAttribute("class", trashIcon);
                            });
                        });
                    }
                }
            
           });
            /*
            else if(completed.classList.contains("active")){
                if(NotesAPI.getAllCheckedNotes().length == 0){
                    alert("No checked note can delete!");
                }
                else{
                    if(!trashIconId.classList.contains('bi-trash3-fill')){
                        trashIcon = trashIcon.replace("bi bi-trash3", "bi bi-trash3-fill");
                        document.getElementById("trashIcon").setAttribute("class", trashIcon);
                        console.log("choose a checked note to delete!");
                        //選擇要刪除的note
                        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
                            noteListItem.addEventListener("click", () => {
                                onCheckedNoteSelect(noteListItem.dataset.noteId);
                                //console.log("noteListItem = ", noteListItem);
                                onCheckedNoteMoveToDeleted(noteListItem.dataset.noteId);
                                onNoteDelete(noteListItem.dataset.noteId);
                                trashIcon = trashIcon.replace("bi bi-trash3-fill", "bi bi-trash3");
                                document.getElementById("trashIcon").setAttribute("class", trashIcon);
                            });
                        });
                    }
                }
            }
            else if(deleted.classList.contains("active")){
                
            }
            */
            
            //console.log("NotesAPI.getAllNotes().length = ", NotesAPI.getAllNotes().length);    
        //});

        //點下check要做的事
        btnCheckNote.addEventListener("click", function(e){
            if(NotesAPI.getAllNotes().length == 0){
                console.log("No note can check!");
            }
            else{
                if(!checkIconId.classList.contains('bi-check-circle-fill')){
                    checkIcon = checkIcon.replace("bi bi-check-circle", "bi bi-check-circle-fill");
                    document.getElementById("checkIcon").setAttribute("class", checkIcon);
                    console.log("choose a note to check!");
                    //選擇要check的note
                    notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
                        noteListItem.addEventListener("click", () => {
                            onNoteSelect(noteListItem.dataset.noteId);
                            onNoteCheck(noteListItem.dataset.noteId);    
                            onNoteDelete(noteListItem.dataset.noteId);
                            checkIcon = checkIcon.replace("bi bi-check-circle-fill", "bi bi-check-circle");
                            document.getElementById("checkIcon").setAttribute("class", checkIcon);
                        });
                    });
                }
            }
        });

        btnReturnNote.addEventListener("click", function(e){
            
            if(!returnIconId.classList.contains('bi bi-reply-fill')){
                
                returnIcon = returnIcon.replace("bi bi-reply", "bi bi-reply-fill")
                returnIcon = returnIcon.replace("hide", "")
                document.getElementById("returnIcon").setAttribute("class", returnIcon);
                deletedListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
                    noteListItem.addEventListener("click", () => {
                        onDeletedNoteSelect(noteListItem.dataset.noteId);
                        onNoteReturn(noteListItem.dataset.noteId);
                        returnIcon = returnIcon.replace("bi bi-reply-fill", "bi bi-reply")
                        document.getElementById("returnIcon").setAttribute("class", returnIcon);
                        console.log("done");
                        returnIconId.classList.remove("hide");
                    });
                })
            }
        });

      
        //filters = nav-item
        filters.forEach((tab) => {
            tab.addEventListener('click', function(e){
                e.preventDefault();
                document.querySelectorAll(".nav-link").forEach((nav) => {
                    nav.classList.remove("active");
                }) 
                this.firstElementChild.classList.add("active");
                
                switch(this.firstElementChild.id){
                    case "tab-processing" :
                        //console.log("processing = ", processing); 
                        processing.classList.remove("active","show");
                        completed.classList.remove("active","show");
                        deleted.classList.remove("active","show");
                        processing.classList.add("active","show");
                        checkIconId.classList.remove("hide");
                        trashIconId.classList.remove("hide");
                        returnIconId.classList.add("hide");
                        break
                    case "tab-completed" :
                        processing.classList.remove("active","show");
                        completed.classList.remove("active","show");
                        deleted.classList.remove("active","show");
                        completed.classList.add("active","show");
                        checkIconId.classList.add("hide");
                        trashIconId.classList.add("hide");
                        returnIconId.classList.add("hide");
                        break
                    case "tab-deleted" :
                        processing.classList.remove("active","show");
                        completed.classList.remove("active","show");
                        deleted.classList.remove("active","show");
                        deleted.classList.add("active","show");
                        checkIconId.classList.add("hide");
                        trashIconId.classList.add("hide");
                        returnIconId.classList.remove("hide");
                        break       
                }
                //console.log("this.firstElementChild = ", this.firstElementChild.id);
            })
        });

        
        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim(); //trim: 移除字串起始及結尾處的空白字元
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        
        this.updateNotePreviewVisibility(false);
    }
    

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;
        return `
            <div id="processing" class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    _createCheckedListItemHTML(id, title, body, updated){
        const MAX_BODY_LENGTH = 60;
        return `
            <div id="completed" class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `
    }

    _createDeletedListItemHTML(id, title, body, updated){
        const MAX_BODY_LENGTH = 60;
        return `
            <div id="deleted" class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector("#processing-tab");
        // Empty list
        notesListContainer.innerHTML = "";
        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));
            notesListContainer.insertAdjacentHTML("beforeend", html);
        }
        // Add select events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
                //console.log("noteListItem.dataset.noteId = ", noteListItem.dataset.noteId);
            });
        });
    }

    updateCheckedNoteList(notes) {
        const notesListContainer = this.root.querySelector("#completed-tab");
        // Empty list
        notesListContainer.innerHTML = "";
        for (const note of notes) {
            const html = this._createCheckedListItemHTML(note.id, note.title, note.body, new Date(note.updated));
            notesListContainer.insertAdjacentHTML("beforeend", html);
        }
        // Add select events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onCheckedNoteSelect(noteListItem.dataset.noteId);
                //console.log("noteListItem.dataset.noteId = ", noteListItem.dataset.noteId);
            });
        });
    }

    updateDeletedNoteList(notes) {
        const notesListContainer = this.root.querySelector("#deleted-tab");
        // Empty list
        notesListContainer.innerHTML = "";
        for (const note of notes) {
            const html = this._createDeletedListItemHTML(note.id, note.title, note.body, new Date(note.updated));
            notesListContainer.insertAdjacentHTML("beforeend", html);
        }
        // Add select events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onDeletedNoteSelect(noteListItem.dataset.noteId);
                //console.log("noteListItem.dataset.noteId = ", noteListItem.dataset.noteId);
            });
        });
    }

    updateActiveNote(note) {        
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}

// bug to fix：1.在Completed標籤中時 若裡面沒有note 則右側欄應不顯示東西，若有note 則右側欄顯示該note內容 且無法編輯
//         2.在Processing標籤中時 若裡面沒有note 則右側欄應不顯示東西
//         3.在Completed標籤中時 notes的顯示順序應照著按下check的順序