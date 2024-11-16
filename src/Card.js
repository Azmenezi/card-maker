// src/Card.jsx
import React from "react";
import ImageUploader from "./ImageUploader";

const Card = ({ index, image, onImageUpload }) => {
  return (
    <div className="card">
      <ImageUploader
        image={image}
        index={index}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default Card;
