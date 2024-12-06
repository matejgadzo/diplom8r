import "../App.scss";
import { ReactComponent as Logo } from "../assets/icon-upload.svg";
import React, { useRef, useState } from "react";
import { Modal } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  const handleDivClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    // Trigger click on the hidden file input
    const element = event.target as HTMLInputElement;
    element.value = "";
    fileInputRef.current?.click();
    setFileName(null);
    console.log("div clicked");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log("modal opened");
    console.log(files);
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFileName(selectedFile.name); // Save the file name for modal display
      setIsModalOpen(true); // Open the modal when a file is selected
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFileName("");
    console.log("modal closed");
  };

  return (
    <div className="container">
      <h1 className="title">Upload a document you want to sign</h1>
      <div className="uploadArea" onClick={handleDivClick}>
        <Logo className="uploadIcon"></Logo>
        <input
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          style={{ display: "none" }}
          accept="application/pdf"
        />
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        className="modalContent"
      >
        <div>
          {fileName && <h1 className="title">Selected File: {fileName}</h1>}
          <button onClick={handleCloseModal} className="cancelButton">
            Cancel
          </button>
          <Document
            file={fileInputRef.current?.files?.[0]}
            className="document"
          >
            <Page
              width={600}
              height={600}
              pageNumber={1}
              className="page"
            ></Page>
          </Document>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
