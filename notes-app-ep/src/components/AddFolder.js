import { useState } from 'react'
const AddFolder = ({ handleAddFolder }) => {
    const [folderTitle, setFolderTitle] = useState('')
    const characterLimit = 20;
    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setFolderTitle(event.target.value);
        }

    };
    const handleSaveClick = () => {
        if (folderTitle.trim().length > 0) {
            handleAddFolder(folderTitle)
            setFolderTitle('')
        }
    }

    return (
        <div className='folder' >
            <textarea 
                rows='1'
                placeholder='Create Folder...'
                value={folderTitle}
                onChange={handleChange}
                style={{border: 'none',resize: 'none',backgroundColor: '#e4dede'}}
            ></textarea>
                <button className="save" onClick={handleSaveClick}>Create</button>
        </div>
    )
}

export default AddFolder;