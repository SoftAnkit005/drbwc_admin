import React, { useState } from 'react';

// Define the backend URL as a constant
const BACKEND_URL = process.env.REACT_APP_API_URL;

const TestUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFilesUrls, setUploadedFilesUrls] = useState([]);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file); // 'files' should match the key expected by the backend
    });

    setUploading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      const data = await response.json();
      setUploadedFilesUrls(data.fileUrls); // Adjust based on your backend response
      console.log('Upload successful:', data);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        multiple 
        onChange={handleFilesChange} 
      />
      <div>
        {previews.map((preview, index) => (
          <img key={index} src={preview} alt={`Preview ${index}`} width="100" />
        ))}
      </div>
      <button 
        type="button" 
        onClick={handleUpload} 
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Images'}
      </button>
      {error && <p>Error: {error}</p>}
      <div>
        {uploadedFilesUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} width="100" />
        ))}
      </div>
    </div>
  );
};

export default TestUploader;
