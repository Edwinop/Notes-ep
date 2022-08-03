import { useState } from 'react'
import { MdOutlineFormatColorFill } from 'react-icons/md'
const AddNote = ({ handleAddNote }) => {
    const [visible, setVisible] = useState(false);
    const [noteText, setNoteText] = useState('')
    const [color, setColor] = useState('#67d7cc');
    const characterLimit = 200;
    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }

    };
    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText, color)
            setNoteText('')
            setColor('#67d7cc')
        }
    }
    const handleColorClick = (color) => {
        setColor(color);
    };
    return (
        <div className='note new' style={{backgroundColor: `${color}`}}>
            <textarea
                rows='8'
                cols='10'
                placeholder='Type a new note...'
                value={noteText}
                onChange={handleChange}
                style={{backgroundColor: `${color}`}}
            ></textarea>
            {visible && <center>
                <div className='color-container'>
                    <div className='color-options'>
                        <div className="item--1" onClick={()=> handleColorClick('#ab82d4')}></div>
                        <div className="item--2" onClick={()=> handleColorClick('#FEC8D8')}></div>
                        <div className="item--3" onClick={()=> handleColorClick('#FFDFD3')}></div>
                        <div className="item--4" onClick={()=> handleColorClick('#4DBCF0')}></div>
                        <div className="item--5" onClick={()=> handleColorClick('#FEC184')}></div>
                        <div className="item--6" onClick={()=> handleColorClick('#F07878')}></div>
                    </div>
                </div>
            </center> }
            <div className="note-footer">
                <small className='character-limit'>{characterLimit - noteText.length} remaining</small>
                <MdOutlineFormatColorFill onClick={() => setVisible(!visible)} className='color-icon' size='1.3em' />
                <button className="save" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    )
}

export default AddNote;