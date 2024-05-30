// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DownloadFile from '../FileDownload/DownloadFile';
// import './FileList.css';

// const FileList = () => {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/files/user', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setFiles(response.data);
//       } catch (error) {
//         console.error('Error fetching files:', error);
//       }
//     };

//     fetchFiles();
//   }, []);

//   return (
//     <div className="file-list-container">
//       <h2>Your Files</h2>
//       <ul>
//         {files.map((file) => (
//           <li key={file.id}>
//             {file.filename}
//             <DownloadFile fileId={file.id} fileName={file.filename} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FileList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DownloadFile from '../FileDownload/DownloadFile';
import './FileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/files/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await axios.delete(`http://localhost:8080/api/files/${fileId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFiles(files.filter(file => file.id !== fileId));
        alert("File successfully deleted.");
      } catch (error) {
        console.error('Error deleting file:', error);
        alert("Failed to delete file.");
      }
    }
  };

  return (
    <div className="file-list-container">
      <h2>Your Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.filename}
            <DownloadFile fileId={file.id} fileName={file.filename} />
            <button onClick={() => handleDelete(file.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DownloadFile from '../FileDownload/DownloadFile';

// const FileList = () => {
//   const [files, setFiles] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await axios.get('http://localhost:8081/api/files/user', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setFiles(response.data);
//       } catch (error) {
//         setError('Error fetching files. Please try again.');
//         console.error('Error fetching files:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFiles();
//   }, []);

//   return (
//     <div>
//       <h2>Your Files</h2>
//       {isLoading ? (
//         <p>Loading files...</p>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : files.length > 0 ? (
//         <ul>
//           {files.map((file) => (
//             <li key={file.id}>
//               {file.filename}
//               <DownloadFile fileId={file.id} fileName={file.filename} />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No files found.</p>
//       )}
//     </div>
//   );
// };

// export default FileList;
