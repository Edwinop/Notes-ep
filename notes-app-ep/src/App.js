import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
//import FoldersList from './components/FolderList';
import Search from './components/Search';
import { MdStickyNote2 } from 'react-icons/md'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const App = () => {
	const [visible, setVisible] = useState(false);
	const [notes, setNotes] = useState([]);
	const [folders, setFolders] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchfolder, setSearchFolder] = useState('');

	const [darkMode, setDarkMode] = useState(false);
	//const folderlist = notes.filter(notes => notes.folder);

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

	const addNote = (text, color, folder) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
			color: color,
			folder: folder
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};
	const uniqueFolders = notes.reduce((acc, current) => {
		const x = acc.find(item => item.folder === current.folder);
		if (!x) {
		  return acc.concat([current]);
		} else {
		  return acc;
		}
	  }, []);

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
				<FormControl sx={{
                        m: 1, minWidth: 160, '& .MuiInputBase-root': {
                            borderRadius: '12px'
                        },
                    }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Folders</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={searchfolder}
                            onChange={(e) => setSearchFolder(e.target.value)}
                            autoWidth
                            label="Folders"
                        >
							<MenuItem value=''><em>None</em></MenuItem>
                            {uniqueFolders.map((uniqueFolder) => (
                                <MenuItem value={uniqueFolder.folder}>{uniqueFolder.folder}</MenuItem>
                            ))}
                        </Select>
				</FormControl>
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
							note.folder.toLowerCase().includes(searchfolder) && note.text.toLowerCase().includes(searchText) 
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