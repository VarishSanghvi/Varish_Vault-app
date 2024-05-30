import React from 'react';
import axios from 'axios';

const DownloadFile = ({ fileId, fileName }) => {
  const downloadFile = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/files/${fileId}`, {
        responseType: 'blob', // Important for binary data
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <button onClick={downloadFile}>Download {fileName}</button>
  );
};

export default DownloadFile;
