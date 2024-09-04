import React, { useState, useEffect } from 'react';
import { Input, Button, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import './filedropzone.scss';
import { IoClose } from 'react-icons/io5';

const FileDropZone = () => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Simulate URL generation or mapping
  const generateImageUrl = (fileName) => {
    // Simulate the URL format you need. You can replace this with your logic.
    return `https://drbwc.com/assets/catalog/some-directory/${fileName}`;
  };

  // Handle file selection
  const handleFile = (files) => {
    const selectedFiles = Array.from(files);

    // Filter files to include only .jpg and .png
    const validFiles = selectedFiles.filter(file =>
      ['image/jpeg', 'image/png'].includes(file.type)
    );

    // Create preview URLs for valid files
    const filesWithPreview = validFiles.map(file => ({
      id: URL.createObjectURL(file),  // Use Object URL as a unique identifier
      file,
      preview: URL.createObjectURL(file),
      url: generateImageUrl(file.name)  // Generate your URL
    }));

    setImages(prevImages => [...prevImages, ...filesWithPreview]);
  };
  // console.log(images);

  // Handle file input change
  const handleFileChange = (e) => {
    handleFile(e.target.files);
  };

  // Handle drag enter
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFile(e.dataTransfer.files);
  };

  // Handle remove image
  const handleRemove = (id) => {
    setImages(prevImages => {
      // Revoke the object URL
      URL.revokeObjectURL(id);

      // Filter out the removed image
      return prevImages.filter(image => image.id !== id);
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.id));
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
          <Input
            type="file"
            multiple
            onChange={handleFileChange}
            className="d-none"
            id="fileInput"
            accept=".jpg,.png"
          />
          <label htmlFor="fileInput" className="file-drag my-0">
            Select a file to upload
            <br />OR
            <br />Drag a file into this box
          </label>
        </Col>
        <Col lg="6">
          <ListGroup className="flex-row gap-2 preview-images flex-wrap">
            {images.map((image) => (
              <ListGroupItem key={image.id} className="position-relative p-0">
                <img
                  src={image.preview}
                  alt={image.file.name}
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
    </div>
  );
};

export default FileDropZone;
