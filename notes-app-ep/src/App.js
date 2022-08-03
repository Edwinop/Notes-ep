import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
//import FoldersList from './components/FolderList';
import Search from './components/Search';
import { MdStickyNote2 } from 'react-icons/md'


 

const App = () => {
	const [visible, setVisible] = useState(false);
	const [notes, setNotes] = useState([]);
	const [folders, setFolders] = useState([]);
	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text, color) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
			color: color
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	useEffect(() => {
		const savedFolders = JSON.parse(
			localStorage.getItem('folder-app-data')
		);

		if (savedFolders) {
			setFolders(savedFolders);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'folder-app-data',
			JSON.stringify(folders)
		);
	}, [folders]);

	/*const addFolder = (title) => {
		const newFolder = {
			folderid: nanoid(),
			title: title,
		};
		const newFolders = [...folders, newFolder];
		setFolders(newFolders);
	};
	const deleteFolder = (folderid) => {
		const newFolders = folders.filter((folder) => folder.folderid !== folderid);
		setFolders(newFolders);
	};*/
	return (
		<div className={`${darkMode ? 'dark-mode' : 'light-mode'}`}>
			<div className="header">
				<MdStickyNote2 className='brand-icon' size='2em' onClick={() => setVisible(!visible)} />
				<h1 style={{fontSize: '2.5rem'}}>Notes</h1>
				<Search handleSearchNote={setSearchText} />
				<button onClick={() => setDarkMode(!darkMode)} className="toggle">Toggle Mode</button>
			</div>
			<div className='container'>
				{/*<div className='folder-container'>
					<span style={{fontWeight: 600}}>Folders</span>
					<br></br>
					
					<FoldersList
						folders={folders}
						handleAddFolder={addFolder}
						handleDeleteFolder={deleteFolder}
					/>
				</div>*/}
				<div className='note-container'>
					<NotesList
						notes={notes.filter((note) =>
							note.text.toLowerCase().includes(searchText)
						)}
						handleAddNote={addNote}
						handleDeleteNote={deleteNote}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;