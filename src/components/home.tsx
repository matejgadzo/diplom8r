import "../App.scss";
import { ReactComponent as Logo } from "../assets/icon-upload.svg";
import React, { useRef, useState } from "react";
import { Modal } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, PDFAnnotation } from "pdf-lib";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const handleDivClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
    fileInputRef.current?.click();
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile: File = files[0];
      const buffer: ArrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc: PDFDocument = await PDFDocument.load(buffer);
      setNumOfPages(pdfDoc.getPageCount()); // Set the number of pages for document navigation
      setFileName(selectedFile.name); // Save the file name for modal display
      setPdfFile(selectedFile); // Store the selected PDF file
      setCurrentPage(1); // Reset page number
      setIsModalOpen(true); // Open the modal when a file is selected
    }
  };
  const nextPage = () => {
    if (currentPage === numOfPages) {
      window.alert("You are on the last page");
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      window.alert("You are on the first page");
    }
  };

  const generateQRCode = () => {
    const link = "https://cotrugli.org";
    const canvas = document.createElement("canvas");
    return canvas.toDataURL();
  };

  const embedToPDF = async () => {
    const buffer: ArrayBuffer = await pdfFile!.arrayBuffer();
    const pdfDoc: PDFDocument = await PDFDocument.load(buffer);
    // pdfDoc.embedPng(generateQRCode());
    await pdfDoc.save();
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            </div>
            <div className="controlButtons">
              <button onClick={handleCloseModal} className="cancelButton">
                Cancel
              </button>
              <button onClick={generateQRCode} className="saveButton">
                Start Signing
              </button>
            </div>
          </div>
          <div className="documentView">
            <Document file={pdfFile}>
              <Page
                pageNumber={currentPage}
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
