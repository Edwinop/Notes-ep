import Note from './Notes';
import AddNote from './AddNote';

const NotesList = ({notes,handleAddNote,handleDeleteNote,}) => {
	return (
		<div className='notes-list'>
			{notes.map((note) => (
				<Note
					id={note.id}
					text={note.text}
					folder={note.folder}
					date={note.date}
					color={note.color}
					handleDeleteNote={handleDeleteNote}
				/>
			))}
			<AddNote handleAddNote={handleAddNote} />
		</div>
	);
};

export default NotesList;