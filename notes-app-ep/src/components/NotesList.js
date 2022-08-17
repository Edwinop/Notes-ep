import Note from './Notes';
import AddNote from './AddNote';

const NotesList = ({notes,handleAddNote,handleDeleteNote,uniqueFolder}) => {
	return (
		<div className='notes-list'>
			<AddNote 
			handleAddNote={handleAddNote} 
			uniqueFolder={uniqueFolder}
			/>
			{notes.reverse().map((note) => (
				<Note
					id={note.id}
					text={note.text}
					folder={note.folder}
					date={note.date}
					color={note.color}
					handleDeleteNote={handleDeleteNote}
					
				/>
			))}
			
		</div>
	);
};

export default NotesList;