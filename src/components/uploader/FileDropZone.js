import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import { IoClose } from 'react-icons/io5';
import './filedropzone.scss';
import { useSelector } from 'react-redux';

const FileDropZone = ({ prodImages, initialImages = [] }) => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const { error, uploadedFilesUrls } = useSelector((state) => state.fileUpload);

  // Initialize images from initialImages, only set if not already present
  useEffect(() => {
    if (initialImages.length && images.length === 0) {
      const initialImagesArray = Array.isArray(initialImages) 
        ? initialImages 
        : JSON.parse(initialImages || '[]');

      const initialImagesWithPreview = initialImagesArray.map(url => ({
        id: url,
        preview: url,
      }));

      setImages(initialImagesWithPreview);
    }
  }, [initialImages]);

  // Update prodImages prop with current images (but only if images actually change)
  useEffect(() => {
    prodImages(images.map(image => image.file || image.preview)); 
  }, [images, prodImages]);
  

  const handleFile = (files) => {
    const selectedFiles = Array.from(files);
    const validFiles = selectedFiles.filter(file =>
      ['image/jpeg', 'image/png'].includes(file.type)
    );
  
    setImages(prevImages => [
      ...prevImages,
      ...validFiles.map(file => ({
        id: URL.createObjectURL(file),
        file,
        preview: URL.createObjectURL(file),
      }))
    ]);
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFile(e.dataTransfer.files);
  };

  const handleRemove = (id) => {
    setImages(prevImages => {
      if (!id.startsWith('http')) {
        URL.revokeObjectURL(id);
      }
      return prevImages.filter(image => image.id !== id);
    });
  };

  useEffect(() => {
    return () => {
      images.forEach(image => {
        if (!image.id.startsWith('http')) {
          URL.revokeObjectURL(image.id);
        }
      });
    };
  }, [images]);
  

  return (
    <div 
      className={`${isDragging ? 'border border-primary border-2' : ''}`} 
      onDragEnter={handleDragEnter} 
      onDragOver={handleDragOver} 
      onDragLeave={handleDragLeave} 
      onDrop={handleDrop}
    >
      <Row>
        <Col lg="6">
          <Input type="file" multiple onChange={handleFileChange} className="d-none" id="fileInput" accept=".jpg,.png" />
          <label htmlFor="fileInput" className="file-drag my-0" >
            Select files to upload <br />OR <br />Drag files into this box
          </label>
        </Col>
        <Col lg="6">
          <ListGroup className="flex-row gap-2 preview-images flex-wrap mt-3 mt-lg-0">
            {images.map((image) => (
              <ListGroupItem key={image.id} className="position-relative p-0">
                <img 
                  src={image.preview} 
                  alt={image.file?.name || 'Preview'} 
                  className="img-thumbnail p-0 me-2" 
                />
                <Button 
                  className="position-absolute p-0 close-button top-0 end-0" 
                  color="danger" 
                  size="sm" 
                  onClick={() => handleRemove(image.id)}
                >
                  <IoClose className='fs-6'/>
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
      {error && <p>Error: {error}</p>}
      <div>
        {uploadedFilesUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} width="100" />
        ))}
      </div>
    </div>
  );
};

FileDropZone.propTypes = {
  prodImages: PropTypes.func.isRequired,
  initialImages: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ])
};

export default FileDropZone;
