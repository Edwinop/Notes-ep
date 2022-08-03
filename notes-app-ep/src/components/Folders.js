import {MdOutlineClose} from 'react-icons/md'

const Folder = ({ folderid, title, handleDeleteFolder }) => {
    return (
        <div className='folder'>
            <small className='folder-title' style={{ fontSize: '1rem' }}>{title}</small>
            <MdOutlineClose onClick = {() => handleDeleteFolder(folderid)} className='folder-delete-icon' size='1.3em' />
        </div>
    )
}
export default Folder;