import { useState } from 'react'
import { MdOutlineFormatColorFill } from 'react-icons/md'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
const AddNote = ({ handleAddNote, uniqueFolder }) => {
    const [visible, setVisible] = useState(false);
    const [visibleCreateFolder, setVisibleCreateFolder] = useState(false);
    const [noteText, setNoteText] = useState('')
    const [folderText, setFolderText] = useState('')
    const [folder, setFolder] = useState('')
    const [color, setColor] = useState('#67d7cc');
    const characterLimit = 200;
    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }

    };
    const characterLimitFolder = 10;
    const handleChangeFolder = (event) => {
        if (characterLimitFolder - event.target.value.length >= 0) {
            setFolderText(event.target.value);
        }

    };
    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText, color, folder)
            console.log(folder)
            setNoteText('')
            setColor('#67d7cc')
            setFolder('')
        }
    }
    const handleColorClick = (color) => {
        setColor(color);
    };
    return (
        <div className='note new' style={{ backgroundColor: `${color}` }}>
            <div className='select-folder'>
                <FormControl sx={{
                    m: 0, p: 1, minWidth: 100, '& .MuiInputBase-root': {
                        height: 40
                    },
                }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Folders</InputLabel>
                    <Select
                        id="demo-simple-select-autowidth"
                        value={folder}
                        onChange={(e) => setFolder(e.target.value)}
                        autoWidth
                    >
                        <MenuItem value=''><em>None</em></MenuItem>
                        {uniqueFolder.map((folderlist) => (
                            <MenuItem value={folderlist}>{folderlist}</MenuItem>
                        ))}
                    </Select>
                    {visibleCreateFolder &&
                        <>
                            <textarea
                                rows='1'
                                placeholder='Type a Folder'
                                value={folderText}
                                onChange={handleChangeFolder}>
                            </textarea>
                            <div onClick={setVisibleCreateFolder}> create</div>
                        </>
                    }
                </FormControl>
            </div>
            <textarea
                rows='8'
                cols='10'
                placeholder='Type a new note...'
                value={noteText}
                onChange={handleChange}
                style={{ backgroundColor: `${color}` }}
            ></textarea>
            {visible && <center>
                <div className='color-container'>
                    <div className='color-options'>
                        <div className="item--1" onClick={() => handleColorClick('#ab82d4')}></div>
                        <div className="item--2" onClick={() => handleColorClick('#FEC8D8')}></div>
                        <div className="item--3" onClick={() => handleColorClick('#FFDFD3')}></div>
                        <div className="item--4" onClick={() => handleColorClick('#4DBCF0')}></div>
                        <div className="item--5" onClick={() => handleColorClick('#FEC184')}></div>
                        <div className="item--6" onClick={() => handleColorClick('#F07878')}></div>
                    </div>
                </div>
            </center>}
            <div className="note-footer">
                <small className='character-limit'>{characterLimit - noteText.length} remaining</small>
                <MdOutlineFormatColorFill onClick={() => setVisible(!visible)} className='color-icon' size='1.3em' />
                <Fab color="primary" size='small' onClick={handleSaveClick} aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        </div>
    )
}

export default AddNote;