import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import { IoClose } from 'react-icons/io5';
import './filedropzone.scss';
import { useSelector } from 'react-redux';

// const FileDropZone = ({ prodImages, initialImages = [] }) => {
//   const [images, setImages] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const { error, uploadedFilesUrls } = useSelector((state) => state.fileUpload);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   // Helper function to convert URL to File
//   const urlToFile = async (url, filename) => {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     return new File([blob], filename, { type: blob.type });
//   };

//   // Initialize images from initialImages
//   useEffect(() => {
//     const initializeImages = async () => {
//       if (initialImages.length && images.length === 0) {
//         const imageUrlsArray = Array.isArray(initialImages) 
//           ? initialImages 
//           : JSON.parse(initialImages || '[]');
  
//         const files = await Promise.all(imageUrlsArray.map(async (url, index) => {
//           const fullUrl = `${apiUrl}/${url}`; // Construct full URL for remote images
//           const filename = `image-${index}.jpg`; // Adjust logic for actual filename
//           const file = await urlToFile(fullUrl, filename);
//           return {
//             id: fullUrl, // Use full URL for remote images instead of object URL
//             file,
//             preview: fullUrl, // Use full URL for preview as well
//           };
//         }));
  
//         setImages(files);
//         prodImages(files.map(image => image.file));
//       }
//     };

//     initializeImages();
//   }, [initialImages, images, prodImages]);

//   // Update prodImages prop with current images (but only if images actually change)
//   useEffect(() => {
//     prodImages(images.map(image => image.file || image.preview)); 
//   }, [images, prodImages]);

//   const handleFile = (files) => {
//     const selectedFiles = Array.from(files);
//     const validFiles = selectedFiles.filter(file =>
//       ['image/jpeg', 'image/png'].includes(file.type)
//     );
  
//     setImages(prevImages => [
//       ...prevImages,
//       ...validFiles.map(file => ({
//         id: URL.createObjectURL(file),
//         file,
//         preview: URL.createObjectURL(file),
//       }))
//     ]);
//   };

//   const handleFileChange = (e) => {
//     handleFile(e.target.files);
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     handleFile(e.dataTransfer.files);
//   };

//   const handleRemove = (id) => {
//     setImages(prevImages => {
//       if (!id.startsWith('http')) {
//         URL.revokeObjectURL(id);
//       }
//       return prevImages.filter(image => image.id !== id);
//     });
//   };

//   useEffect(() => {
//     return () => {
//       images.forEach(image => {
//         if (!image.id.startsWith('http')) {
//           URL.revokeObjectURL(image.id);
//         }
//       });
//     };
//   }, [images]);

//   return (
//     <div className={`${isDragging ? 'border border-primary border-2' : ''}`} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} >
//       <Row>
//         <Col lg="6">
//           <Input type="file" multiple onChange={handleFileChange} className="d-none" id="fileInput" accept=".jpg,.png" />
//           <label htmlFor="fileInput" className="file-drag my-0">
//             Select files to upload <br />OR <br />Drag files into this box
//           </label>
//         </Col>
//         <Col lg="6">
//           <ListGroup className="flex-row gap-2 preview-images flex-wrap mt-3 mt-lg-0">
//             {images.map((image, i) => (
//               <ListGroupItem key={i} className="position-relative p-0">
//                 <img 
//                   src={image.preview}
//                   alt={image.file?.name || 'Preview'} 
//                   className="img-thumbnail p-0 me-2" 
//                 />
//                 <Button 
//                   className="position-absolute p-0 close-button top-0 end-0" 
//                   color="danger" 
//                   size="sm" 
//                   onClick={() => handleRemove(image.id)}
//                 >
//                   <IoClose className='fs-6'/>
//                 </Button>
//               </ListGroupItem>
//             ))}
//           </ListGroup>
//         </Col>
//       </Row>
//       {error && <p>Error: {error}</p>}
//       <div>
//         {uploadedFilesUrls.map((url, index) => (
//           <img key={index} src={url} alt={`Uploaded ${index}`} width="100" />
//         ))}
//       </div>
//     </div>
//   );
// };

// FileDropZone.propTypes = {
//   prodImages: PropTypes.func.isRequired,
//   initialImages: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.string),
//     PropTypes.string
//   ])
// };

// export default FileDropZone;


const FileDropZone = ({ prodImages, initialImages = [] }) => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const { error, uploadedFilesUrls } = useSelector((state) => state.fileUpload);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [previousImages, setPreviousImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // State to track if images have been initialized
  const [imagesInitialized, setImagesInitialized] = useState(false);

  // Helper function to convert URL to File
  const urlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  // Initialize images from initialImages
  // console.log('initialImages', initialImages);
  // console.log('newImages', newImages);
  
  const separateImages = () => {
    const prevImages = images?.filter(image => image.id.startsWith('https'));
    const nImages = images?.filter(image => image.id.startsWith('blob'));
    const previews = prevImages.map(image => image.preview)

    // console.log('prevImages', prevImages);
    // console.log('previews', previews);
    // console.log('nImages', nImages);
  
    setPreviousImages(previews);
    setNewImages(nImages);
  };
  
  useEffect(() => {
    const initializeImages = async () => {
      if (initialImages.length && images.length === 0 && !imagesInitialized) {
        // console.log('Initializing images...');
        const imageUrlsArray = Array.isArray(initialImages)
          ? initialImages
          : JSON.parse(initialImages || '[]');

        const files = await Promise.all(imageUrlsArray.map(async (url, index) => {
          const fullUrl = `${apiUrl}/${url}`; // Construct full URL for remote images
          const filename = `image-${index}.jpg`; // Adjust logic for actual filename
          const file = await urlToFile(fullUrl, filename);
          return {
            id: fullUrl, // Use full URL for remote images instead of object URL
            file,
            preview: url, // Use full URL for preview as well
          };
        }));

        setImages(files);
        setImagesInitialized(true); // Mark images as initialized
      }
    };

    initializeImages();
    separateImages();
  }, [initialImages, images.length, prodImages, imagesInitialized]); // Include imagesInitialized in dependency array

  // Update prodImages prop with current images (but only if images actually change)
  useEffect(() => {
    prodImages(newImages.map(image => image.file || image.preview), previousImages);
  }, [newImages.length, previousImages.length, prodImages]);

  const handleFile = (files) => {
    const selectedFiles = Array.from(files);
    // prodImages(selectedFiles);
    const validFiles = selectedFiles.filter(file =>
      ['image/jpeg', 'image/png'].includes(file.type)
    );

    setImages(prevImages => [
      ...prevImages,
      ...validFiles.map(file => ({
        id: URL.createObjectURL(file),
        file,
        preview: URL.createObjectURL(file),
      })),
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
    // console.log('Removing image:', id);
    setImages(prevImages => {
      if (!id.startsWith('http')) {
        URL.revokeObjectURL(id);
      }
      const updatedImages = prevImages.filter(image => image.id !== id);

      // If no images left, set to empty
      if (updatedImages.length === 0) {
        prodImages([]); // Clear prodImages if no images left
      }
      return updatedImages;
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
    <div className={`${isDragging ? 'border border-primary border-2' : ''}`} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} >
      <Row>
        <Col lg="6">
          <Input type="file" multiple onChange={handleFileChange} className="d-none" id="fileInput" accept=".jpg,.png" />
          <label htmlFor="fileInput" className="file-drag my-0">
            Select files to upload <br />OR <br />Drag files into this box
          </label>
        </Col>
        <Col lg="6">
          <ListGroup className="flex-row gap-2 preview-images flex-wrap mt-3 mt-lg-0">
            {images.map((image, i) => (
              <ListGroupItem key={i} className="position-relative p-0">
                <img src={image.id} alt={image.file?.name || 'Preview'} className="img-thumbnail p-0 me-2" />
                <Button className="position-absolute p-0 close-button top-0 end-0" color="danger" size="sm" onClick={() => handleRemove(image.id)} > <IoClose className='fs-6' /> </Button>
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