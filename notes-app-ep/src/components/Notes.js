import { MdDeleteForever } from 'react-icons/md'
import { MdFolder } from 'react-icons/md'
const Note = ({id,folder,text,date,color,handleDeleteNote}) => {
    return (
        <>
        <div className='note' style={{backgroundColor: `${color}`}}>
            <span>
            <center><span style={{fontSize: 25}}>{folder}</span></center>
            {text}
            </span>
            <div className='note-footer'>
                <small>{date}</small>
                <MdDeleteForever onClick = {()=>handleDeleteNote(id)}className='delete-icon' size='1.3em' />
            </div>
        </div>
        </>
    )
}
export default Note;