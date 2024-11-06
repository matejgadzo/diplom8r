import "../App.scss";
import {ReactComponent as Logo} from "../assets/icon-upload.svg";
import React, {useRef} from "react";
function Home() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDivClick = () => {
        // Trigger click on the hidden file input
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            console.log(files[0]); // Log the first selected file, or handle the file as needed
        }
    };

    return (
        <div className="container">
            <h1 className="title">Upload a document you want to sign</h1>
            <div className="uploadArea" onClick={handleDivClick} >
                <Logo className="uploadIcon"></Logo>
                <input ref={fileInputRef} onChange={handleFileChange} type="file" style={{display: 'none'}} accept="application/pdf"/>
            </div>
        </div>
    );
}
export default Home;