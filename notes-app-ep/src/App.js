import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import { MdStickyNote2 } from 'react-icons/md'
import FormControl from '@mui/material/FormControl';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MaterialUISwitch } from './components/Switch';
import { styled } from '@mui/material/styles';
const App = () => {
	const [notes, setNotes] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchfolder, setSearchFolder] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [openDelete, setOpenDelete] = React.useState(false);
	const [addFolder, setAddFolder] = useState('');
	const [uniqueFolder, setUniqueFolder] = useState([])
	const [deleteFolder, setDeleteFolder] = useState('')
	const [openSnackCreate, setOpenSnackCreate] = useState(false);
	const [openSnackDelete, setOpenSnackDelete] = useState(false);

	const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
		'&.MuiButtonBase-root, &.Mui:hover': {
			color: 'black',
			backgroundColor: "#d9d3b6",
		  },
		'&.Mui-selected, &.Mui-selected:hover': {
		  color: 'black',
		  backgroundColor: selectedColor,
		},
	  }));
	const handleClickSnackDelete = () => {
		setOpenSnackDelete(false)
	};
	const handleClickSnackCreate = () => {
		setOpenSnackCreate(false);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClickOpenDelete = () => {
		setOpenDelete(true);
	};
	const handleClick = () => {
		const newFolder = [...uniqueFolder, addFolder]
		setUniqueFolder(newFolder)
		setOpen(false);
		setAddFolder('')
		setOpenSnackCreate(true);
	};

	const handleClickDelete = () => {
		const newFolders = uniqueFolder.filter(folder => folder !== deleteFolder);
		setUniqueFolder(newFolders)
		const newNotes = notes.filter((note) => note.folder !== deleteFolder);
		setNotes(newNotes);
		setOpenDelete(false);
		setDeleteFolder('')
		setOpenSnackDelete(true)
	};
	const handleCloseDelete = (event, reason) => {
		if (reason !== 'backdropClick') {
			setOpenDelete(false);
		}
	};
	const handleClose = (event, reason) => {
		if (reason !== 'backdropClick') {
			setOpen(false);
		}
	};

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
			folder: folder,
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
			localStorage.getItem('folder-note-data')
		);

		if (savedFolders) {
			setUniqueFolder(savedFolders);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'folder-note-data',
			JSON.stringify(uniqueFolder)
		);
	}, [uniqueFolder]);
	return (
		<div className={`${darkMode ? 'dark-mode' : 'light-mode'}`}>
			<Snackbar
				open={openSnackCreate}
				onClose={handleClickSnackCreate}
				message="Folder Created"
				autoHideDuration={6000}
			/>
			<Snackbar
				open={openSnackDelete}
				onClose={handleClickSnackDelete}
				message="Folder Deleted"
				autoHideDuration={6000}
			/>
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Create</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<TextField id="standard-basic" label="Create Folder" variant="standard" value={addFolder} onChange={(e) => setAddFolder(e.target.value)} />
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClick}>Create</Button>
				</DialogActions>
			</Dialog>

			<Dialog disableEscapeKeyDown open={openDelete} onClose={handleCloseDelete}>
				<DialogTitle>Delete</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id="demo-simple-select-autowidth-label">Folders</InputLabel>
							<Select
								id="demo-simple-select-autowidth"
								value={deleteFolder}
								onChange={(e) => setDeleteFolder(e.target.value)}
								autoWidth
							>
								{uniqueFolder?.map((folderlist) => (
									<MenuItem value={folderlist}>{folderlist}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDelete}>Cancel</Button>
					<Button onClick={handleClickDelete}>Delete</Button>
				</DialogActions>
			</Dialog>
			<div className="header">
				<MdStickyNote2 className='brand-icon' size='35px'/>
				<h1 style={{ fontSize: '2.5rem' }}>Post-It</h1>
				<Search handleSearchNote={setSearchText} />
				<div className="toggle">
					<FormControlLabel  onClick={() => setDarkMode(!darkMode)} control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />} label=""/>
				</div>
			</div>
			<div className='container'>
				<div>			
						<div className='folder-list'>
							<div className='folder'>
								<ToggleButtonGroup value='' exclusive onChange={(e) => setSearchFolder(e.target.value)}>
									<ToggleButton selectedColor="#00abc0" value='' >
										All
									</ToggleButton>
								</ToggleButtonGroup>
							</div>
								{uniqueFolder?.map((folderlist) => (
									<div className='folder'>
									<ToggleButtonGroup value={searchfolder} exclusive onChange={(e) => setSearchFolder(e.target.value)}>
										<ToggleButton selectedColor="#00abc0" value={folderlist} >
											{folderlist}
										</ToggleButton>
									</ToggleButtonGroup>
									</div>
								))}
						</div>
							<div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
								<Fab sx={{ m: 1 }} size="small" color="success" aria-label="create" onClick={handleClickOpen}>
									<CreateNewFolderIcon fontSize="small" className='create-folder' />
								</Fab>
								<Fab sx={{ m: 1 }} size="small" color="error" aria-label="delete" onClick={handleClickOpenDelete}>
									<FolderDeleteIcon fontSize="small" className='delete-folder' />
								</Fab>

							</div>
					
				</div>
				<div className='note-container'>
					<NotesList
						notes={notes.filter((note) =>
							note.folder?.includes(searchfolder) && note.text.toLowerCase().includes(searchText)
						)}
						uniqueFolder={uniqueFolder}
						handleAddNote={addNote}
						handleDeleteNote={deleteNote}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;