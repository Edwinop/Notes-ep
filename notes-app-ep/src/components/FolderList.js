import Folder from './Folders';
import AddFolder from './AddFolder';

const FoldersList = ({folders,handleAddFolder,handleDeleteFolder}) => {
	return (
		<div className='folders-list'>
			{folders.map((folder) => (
				<Folder
					folderid={folder.folderid}
					title={folder.title}
					handleDeleteFolder={handleDeleteFolder}
				/>
			))}
			<AddFolder handleAddFolder={handleAddFolder} />
		</div>
	);
};

export default FoldersList;