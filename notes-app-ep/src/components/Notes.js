import { MdDeleteForever } from 'react-icons/md'

const Note = ({id,text,date,color,handleDeleteNote}) => {
    return (
        <div className='note' style={{backgroundColor: `${color}`}}>
            <span>{text}</span>
            <div className='note-footer'>
                <small>{date}</small>
                <MdDeleteForever onClick = {()=>handleDeleteNote(id)}className='delete-icon' size='1.3em' />
            </div>
        </div>
    )
}
export default Note;