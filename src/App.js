// src/App.jsx
import React, { useState } from "react";
import Card from "./Card";
import { exportToPdf } from "./ExportPDF";
import "./App.css";

function App() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [frontImages, setFrontImages] = useState(Array(9).fill(null));

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    setBackgroundImage(URL.createObjectURL(file));
  };

  const handleFrontImageUpload = (index, file) => {
    const newFrontImages = [...frontImages];
    newFrontImages[index] = URL.createObjectURL(file);
    setFrontImages(newFrontImages);
  };

  const exportFronts = () => {
    exportToPdf("card-fronts", "Card_Fronts", frontImages);
  };

  const exportBacks = () => {
    const backImages = Array(9).fill(backgroundImage);
    exportToPdf("card-backs", "Card_Backs", backImages);
  };

  return (
    <div className="app">
      <h1>Playing Card Maker</h1>

      <div className="controls">
        <label>
          Set Card Background:
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
          />
        </label>
        <button onClick={exportFronts}>Export Fronts to PDF</button>
        <button onClick={exportBacks}>Export Backs to PDF</button>
      </div>

      {/* Card Fronts */}
      <div className="a4-sheet">
        <div id="card-fronts" className="grid">
          {frontImages.map((image, index) => (
            <Card
              key={index}
              index={index}
              image={image}
              onImageUpload={handleFrontImageUpload}
            />
          ))}
        </div>
      </div>

      {/* Card Backs */}
      <div className="a4-sheet">
        <div id="card-backs" className="grid">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <div className="card" key={index}>
                {backgroundImage && (
                  <img src={backgroundImage} alt="Card Back" />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
