import "../App.scss";
import {ReactComponent as Logo} from "../assets/icon-upload.svg";
import React, {useRef, useState} from "react";
import { Modal } from '@mui/material';
function Home() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleDivClick = () => {
        // Trigger click on the hidden file input
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            const fileUrl = URL.createObjectURL(selectedFile);
            setFileName(selectedFile.name); // Save the file name for modal display
            setIsModalOpen(true); // Open the modal when a file is selected
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (fileUrl) {
            URL.revokeObjectURL(fileUrl); // Clean up the URL to prevent memory leaks
            setFileUrl(null);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Upload a document you want to sign</h1>
            <div className="uploadArea" onClick={handleDivClick} >
                <Logo className="uploadIcon"></Logo>
                <input ref={fileInputRef} onChange={handleFileChange} type="file" style={{display: 'none'}} accept="application/pdf"/>
            </div>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="file-preview-modal"
                aria-describedby="file-preview-description"
            >
                <div className="modal-content" style={modalContentStyles}>
                    <button onClick={handleCloseModal} style={closeButtonStyles}>Cancel</button>
                    {fileName && (
                        <p className="fileInfo">
                            Selected File: {fileName}
                        </p>
                    )}
                </div>
            </Modal>
        </div>
    );
}
const modalContentStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
};

const closeButtonStyles: React.CSSProperties = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom: '10px',
};

export default Home;