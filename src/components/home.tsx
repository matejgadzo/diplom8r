import "../App.scss";
import { ReactComponent as Logo } from "../assets/icon-upload.svg";
import React, { useRef, useState } from "react";
import { Modal } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { QRCodeCanvas } from "qrcode.react";
import { PDFDocument } from "pdf-lib";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { preProcessFile } from "typescript";

function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [qrData, setQrData] = useState("https://example.com");
  const [qrPosition, setQrPosition] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  const handleDivClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFileName(selectedFile.name); // Save the file name for modal display
      setPdfFile(selectedFile); // Store the selected PDF file
      setPageNumber(1); // Reset page number
      console.log("size", selectedFile);
      setIsModalOpen(true); // Open the modal when a file is selected
    }
  };
  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber > 1){
      setPageNumber(pageNumber - 1);
    }else{
      window.alert("You are on the first page");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleQrDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQrData(event.target.value); // Change QR code data
  };

  // Function to handle dragging the QR code around the page
  const handleQrDrag = (event: React.MouseEvent) => {
    const offsetX = event.clientX - qrPosition.x;
    const offsetY = event.clientY - qrPosition.y;

    setQrPosition({
      x: offsetX,
      y: offsetY,
    });
  };

  const generatePdfWithQrCode = async () => {
    if (!pdfFile || !qrData) return;
    const existingPdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Create a canvas for QR code generation
    const qrCanvas = document.createElement("canvas");
    //QRCodeCanvas
    const imageBytes = qrCanvas.toDataURL("image/png");
    const image = await pdfDoc.embedPng(imageBytes);

    // Get the page to add the QR code
    const page = pdfDoc.getPage(pageNumber - 1);
    page.drawImage(image, {
      x: qrPosition.x,
      y: qrPosition.y,
      width: 100,
      height: 100,
    });

    // Save the PDF with the new QR code
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    // Create a download link for the modified PDF
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName + "signed.pdf";
    link.click();
  };

  return (
    <div className="container">
      <h1 className="title">Upload a document you want to sign</h1>
      <div className="uploadArea" onClick={handleDivClick}>
        <Logo className="uploadIcon" />
        <input
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          style={{ display: "none" }}
          accept="application/pdf"
        />
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="modalContent">
          <div className="controls">
            {fileName && <span className="title">File: {fileName}</span>}
            <div className="controlButtons">
              <button onClick={previousPage} className="docNavigation">
                Previous Page
              </button>
              <button onClick={nextPage} className="docNavigation">
                Next Page
              </button>
              <button onClick={handleCloseModal} className="cancelButton">
                Cancel
              </button>
              <button onClick={generatePdfWithQrCode} className="saveButton">
                Export signed PDF
              </button>
            </div>
            {/* QR Code Input 
            <div>
              <input
                type="text"
                value={qrData}
                onChange={handleQrDataChange}
                placeholder="Enter QR Code Data"
              />
            </div>*/}
          </div>
          <div className="documentView">
            <Document file={pdfFile}>
              <Page
                pageNumber={pageNumber}
                className="page"
                width={600}
                height={750}
              />
            </Document>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
