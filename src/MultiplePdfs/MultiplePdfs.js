import SideScreen from './SideScreen';
import Chat from './Chat';
import { useFile } from "../FIleContext";
import { useState, useEffect } from 'react';
import ResultScreen from '../Pages/ResultScreen';


const MultiplePdfs = () => {
  const { setFile, file } = useFile();
  const [name, setName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {

    if (file) {
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        { name: file.name, url: 'path/to/pdf' }, // Adjust the URL as needed
      ]);
    }
  }, [file]);
  const [uploadedPdf, setUploadedPdf] = useState(null);

  const handleFileUpload = (file) => {
    // You can implement file upload logic here
    // For simplicity, we're just setting the uploaded PDF name
    setUploadedPdf(file.name);
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
    setName(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        localStorage.setItem("fileData", e.target.result);
        localStorage.setItem("fileName", file.name);
        localStorage.setItem("fileType", file.type);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div
        className=""
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          overflowY: "hidden",
          backgroundColor: "white",
        }}
      >
        <div style={{ flexBasis: "30%", flexGrow: 0, flexShrink: 0, }}>
          <SideScreen uploadedFiles={uploadedFiles} />
          {/* <FileUpload onFileUpload={handleFileUpload} /> */}
          {uploadedPdf && <ResultScreen pdfName={uploadedPdf} />}
        </div>
        <div style={{ flexBasis: "70%", flexGrow: 0, flexShrink: 0 }}>
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default MultiplePdfs