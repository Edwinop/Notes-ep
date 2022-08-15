import { useState } from 'react'
import { MdOutlineFormatColorFill } from 'react-icons/md'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const AddNote = ({ handleAddNote }) => {
    const [visible, setVisible] = useState(false);
    const [visibleCreateFolder, setVisibleCreateFolder] = useState(false);
    const [noteText, setNoteText] = useState('')
    const [folderText, setFolderText] = useState('')
    const [folder, setFolder] = useState('main')
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
            setNoteText('')
            setColor('#67d7cc')
            setFolder('')
        }
    }
    const handleColorClick = (color) => {
        setColor(color);
    };
    const options = [
        {
            label: "Main",
            value: "main",
        },
        {
            label: "Apple",
            value: "apple",
        },
        {
            label: "Mango",
            value: "mango",
        },
        {
            label: "Banana",
            value: "banana",
        },
        {
            label: "Pineapple",
            value: "pineapple",
        },
    ];

    return (
        <div className='note new' style={{ backgroundColor: `${color}` }}>
            <div className='select-folder'>
                    <FormControl sx={{
                        m: 1, minWidth: 160, '& .MuiInputBase-root': {
                            borderRadius: '12px'
                        },
                    }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Folders</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={folder}
                            onChange={(e) => setFolder(e.target.value)}
                            autoWidth
                            label="Folders"
                        >
                            {options.map((option) => (
                                <MenuItem value={option.value}>{option.label}</MenuItem>
                            ))}
                            <MenuItem onClick={setVisibleCreateFolder}>Create Folder</MenuItem>
                        </Select>
                        {/*{visibleCreateFolder &&
                            <>
                                <textarea
                                    rows='1'
                                    placeholder='Type a Folder'
                                    value={folderText}
                                    onChange={handleChangeFolder}>
                                </textarea>
                                <div onClick={setVisibleCreateFolder}> create</div>
                            </>
                        }*/}
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
                <button className="save" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    )
}

export default AddNote;