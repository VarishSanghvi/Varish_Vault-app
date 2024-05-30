// import React, { useState } from 'react';
// import axios from 'axios';
// import './FileUpload.css';

// const FileUpload = () => {
//     const [file, setFile] = useState(null);
//     const [previewContent, setPreviewContent] = useState(null);
//     const [previewType, setPreviewType] = useState('');

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFile(file);
//             const reader = new FileReader();
//             if (file.type.startsWith('image/')) {
//                 reader.onloadend = () => {
//                     setPreviewContent(reader.result);
//                     setPreviewType('image');
//                 };
//                 reader.readAsDataURL(file);
//             } else if (file.type.startsWith('text/')) {
//                 reader.onloadend = () => {
//                     setPreviewContent(reader.result);
//                     setPreviewType('text');
//                 };
//                 reader.readAsText(file);
//             }
//         }
//     };

//     const handleFileUpload = async () => {
//         if (!file) {
//             alert('File not given. Please select a file to upload.');
//             return;
//         }

//         const token = localStorage.getItem('token');
//         if (!token) {
//             console.error('No token found in local storage');
//             alert('Authentication failed. No token found.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             console.log('File uploaded successfully:', {
//                 id: response.data.id,
//                 filename: response.data.filename,
//                 contentType: response.data.contentType
//             });
//             alert('Submission successful!');
//             setFile(null); // Clear the file after upload
//             setPreviewContent(null); // Clear the preview
//             setPreviewType(''); // Reset preview type
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             alert('Error uploading file. Please try again.');
//         }
//     };

//     const handleDiscard = () => {
//         setFile(null);
//         setPreviewContent(null);
//         setPreviewType('');
//         alert('File selection discarded.');
//     };

//     return (
//         <div className="file-upload-container">
//             <div className="preview-container">
//                 {previewType === 'image' && <img src={previewContent} alt="Preview" />}
//                 {previewType === 'text' && <textarea value={previewContent} readOnly />}
//                 {file && <button onClick={handleDiscard}>Discard</button>}
//             </div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleFileUpload} disabled={!file}>Upload File</button>
//         </div>
//     );
// };

// export default FileUpload;

import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [previewContent, setPreviewContent] = useState(null);
    const [previewType, setPreviewType] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("File selected:", file.name); // Debugging: Log selected file
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewContent(reader.result);
                setPreviewType(file.type.startsWith('image/') ? 'image' : 'text');
            };
            if (file.type.startsWith('image/')) {
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('text/')) {
                reader.readAsText(file);
            }
        } else {
            console.log("No file selected or file deselected."); // Debugging: Log deselection
            alert('No file is selected to upload. Please select a file.');
            setFile(null);
            setPreviewContent(null);
            setPreviewType('');
        }
    };

    const handleFileUpload = async () => {
        console.log("Upload button clicked, file:", file); // Debugging: Check file at upload time
        if (!file) {
            alert('No file is selected to upload. Please select a file.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Authentication failed. No token found.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Submission successful!');
            console.log('File uploaded successfully:', response.data);
            setFile(null);
            setPreviewContent(null);
            setPreviewType('');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
    };

    const handleDiscard = () => {
        alert('File selection discarded.');
        setFile(null);
        setPreviewContent(null);
        setPreviewType('');
    };

    return (
        <div className="file-upload-container">
            <div className="preview-container">
                {previewType === 'image' && <img src={previewContent} alt="Preview" />}
                {previewType === 'text' && <textarea value={previewContent} readOnly />}
                {file && <button onClick={handleDiscard}>Discard</button>}
            </div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload} disabled={!file}>Upload File</button>
        </div>
    );
};

export default FileUpload;
