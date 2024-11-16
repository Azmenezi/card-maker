// src/ImageUploader.jsx
import React from "react";

const ImageUploader = ({ image, index, onImageUpload }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onImageUpload(index, file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    onImageUpload(index, file);
  };

  return (
    <div
      className="image-uploader"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <p>Drag & Drop or Click to Upload</p>
      <input type="file" accept="image/*" onChange={handleChange} />
      {image && (
        <img
          style={{ position: "absolute" }}
          src={image}
          alt={`Card Front ${index + 1}`}
        />
      )}
    </div>
  );
};

export default ImageUploader;
