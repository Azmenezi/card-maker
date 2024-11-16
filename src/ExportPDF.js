// src/ExportPDF.jsx
import jsPDF from "jspdf";

export const exportToPdf = async (elementId, filename, cardImages) => {
  const pdf = new jsPDF("portrait", "mm", "a4");

  const pageWidth = 210;
  const pageHeight = 297;

  //larger card size
  //   const cardWidthMM = 65.5;
  //   const cardHeightMM = 94;

  //normal card size
  const cardWidthMM = 63;
  const cardHeightMM = 88;

  const totalGridWidth = cardWidthMM * 3;
  const totalGridHeight = cardHeightMM * 3;
  const marginX = (pageWidth - totalGridWidth) / 2;
  const marginY = (pageHeight - totalGridHeight) / 2;

  for (let i = 0; i < cardImages.length; i++) {
    const imgSrc = cardImages[i];

    if (imgSrc) {
      const imgData = await loadImage(imgSrc);

      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = marginX + col * cardWidthMM;
      const y = marginY + row * cardHeightMM;

      pdf.addImage(imgData, "PNG", x, y, cardWidthMM, cardHeightMM);
    }
  }

  // **Add Cutting Guides**
  // Set line style
  pdf.setLineWidth(0.1); // 0.1 mm line width
  pdf.setDrawColor(0, 0, 0); // Black color

  const tickSize = 5; // 5mm tick marks

  // **Vertical Cutting Guides**
  for (let i = 1; i < 3; i++) {
    const x = marginX + i * cardWidthMM;
    // Top tick mark
    pdf.line(x, marginY - tickSize, x, marginY);
    // Bottom tick mark
    pdf.line(
      x,
      marginY + totalGridHeight,
      x,
      marginY + totalGridHeight + tickSize
    );
  }

  // **Horizontal Cutting Guides**
  for (let i = 1; i < 3; i++) {
    const y = marginY + i * cardHeightMM;
    // Left tick mark
    pdf.line(marginX - tickSize, y, marginX, y);
    // Right tick mark
    pdf.line(
      marginX + totalGridWidth,
      y,
      marginX + totalGridWidth + tickSize,
      y
    );
  }

  pdf.save(`${filename}.pdf`);
};

const MM_TO_INCH = 25.4;
const DPI = 300; // Use 300 DPI for high-quality print

const cardWidthMM = 63;
const cardHeightMM = 88;

const cardWidthPx = Math.round((cardWidthMM / MM_TO_INCH) * DPI);
const cardHeightPx = Math.round((cardHeightMM / MM_TO_INCH) * DPI);

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable CORS if needed
    img.onload = () => {
      // Create a canvas with the card dimensions in pixels
      const canvas = document.createElement("canvas");
      canvas.width = cardWidthPx;
      canvas.height = cardHeightPx;

      const ctx = canvas.getContext("2d");

      // Compute aspect ratios
      const imgAspectRatio = img.width / img.height;
      const cardAspectRatio = canvas.width / canvas.height;

      let renderableWidth, renderableHeight, xStart, yStart;

      // Determine the dimensions and start points
      if (imgAspectRatio > cardAspectRatio) {
        // Image is wider than the card
        renderableHeight = canvas.height;
        renderableWidth = img.width * (canvas.height / img.height);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
      } else {
        // Image is taller than the card
        renderableWidth = canvas.width;
        renderableHeight = img.height * (canvas.width / img.width);
        xStart = 0;
        yStart = (canvas.height - renderableHeight) / 2;
      }

      // Draw the image onto the canvas
      ctx.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);

      // Get the Data URL of the canvas
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = src;
  });
};
