import AddNote from "./AddNote.js";
import Note from "./Notes.js";

const NotesList = ({notes}) =>{
    return(
        <div className='notes-list'>
            {notes.map((note)=> (
            <Note id={note.id} text={note.text} data={note.data}/>
            ))}
            <AddNote/>
        </div>
    )
}

export default NotesList;