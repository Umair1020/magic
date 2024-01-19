import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useFile } from "../../FIleContext";

const MAX_COUNT = 5;

const Allpdf = ({hide}) => {
    const { setFile, file } = useFile();
    const [name, setName] = useState("");
    const [isOcrChecked, setIsOcrChecked] = useState(false);
    const [activeButton, setActiveButton] = useState("document");
    const [showFileUpload, setShowFileUpload] = useState(true);
    const formdata = new FormData();
    formdata.append("pdfDoc", file);
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
    const navigate = useNavigate();
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
    // const handleFileChange = async (event) => {
    //   const uploaded = [...uploadedFiles];
    //   let limitExceeded = false;
    //   files.some((file) => {
    //       if (uploaded.findIndex((f) => f.name === file.name) === -1) {
    //           uploaded.push(file);
    //           if (uploaded.length === MAX_COUNT) setFileLimit(true);
    //           if (uploaded.length > MAX_COUNT) {
    //               alert(`You can only add a maximum of ${MAX_COUNT} files`);
    //               setFileLimit(false);
    //               limitExceeded = true;
    //               return true;
    //           }
    //       }
    //   })
    //   if (!limitExceeded) setUploadedFiles(uploaded)
    //     const file = event.target.files[0];
    //     setFile(file);
    //     setName(file);
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onload = function (e) {
    //         localStorage.setItem("fileData", e.target.result);
    //         localStorage.setItem("fileName", file.name);
    //         localStorage.setItem("fileType", file.type);
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   };
    
    const handleUrl = () => {
        // const res = await axios.post(`${baseurl}/api/pdf/createOnlyPdf`, formdata);
        if (isOcrChecked) {
          // Ensure the file is selected for OCR
          if (!file) {
            toast.error("Please select a file for OCR.", {
              position: "top-right",
              autoClose: 3000, // milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            return;
          }
    
          // Redirect to OCR page
          navigate("/allpdf");
        } else {
          const fileSection = document.querySelector(".file-upload-section");
    
          if (fileSection.style.display !== "none" && !file) {
            // File upload section is active, but no file is selected
            toast.error("Please select a file.", {
              position: "top-right",
              autoClose: 3000, // milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            // Navigate only if a file is selected
            navigate("/allpdf");
          }
        }
      };

    // const handleUploadFiles = files => {
    //     const uploaded = [...uploadedFiles];
    //     let limitExceeded = false;
    //     files.some((file) => {
    //         if (uploaded.findIndex((f) => f.name === file.name) === -1) {
    //             uploaded.push(file);
    //             if (uploaded.length === MAX_COUNT) setFileLimit(true);
    //             if (uploaded.length > MAX_COUNT) {
    //                 alert(`You can only add a maximum of ${MAX_COUNT} files`);
    //                 setFileLimit(false);
    //                 limitExceeded = true;
    //                 return true;
    //             }
    //         }
    //     })
    //     if (!limitExceeded) setUploadedFiles(uploaded)

    // }

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleFileChange(chosenFiles);
    }

    return (
        <div>
  <div
        className="sc-f44562c1-1 cseGOX my-3"
        style={{ maxWidth: "700px", margin: "auto" }}
        data-show=""
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "flex-end",
          }}
        >
          <button
            onClick={hide}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            X
          </button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "4px",
            padding: "4px",
            marginBlock: "24px",
            background: "rgb(246, 246, 248)",
            borderRadius: "24px",
            width: " fit-content",
          }}
        >
          <button
            style={
              activeButton === "document"
                ? {
                  background: "rgb(255, 255, 255)",
                  padding: "8px 16px",
                  boxShadow:
                    "rgba(47, 43, 67, 0.1) 0px 1px 3px, rgba(47, 43, 67, 0.1) 0px -1px 0px inset",
                  borderRadius: "24px",
                  cursor: "pointer",
                }
                : {
                  background: "transparent",
                  padding: "8px 16px",
                  borderRadius: "0px",
                  cursor: "pointer",
                }
            }
            className=""
            onClick={() => toggleSections("document")}
          >
            Upload by Document
          </button>
          <button
            style={
              activeButton === "url"
                ? {
                  background: "rgb(255, 255, 255)",
                  padding: "8px 16px",
                  boxShadow:
                    "rgba(47, 43, 67, 0.1) 0px 1px 3px, rgba(47, 43, 67, 0.1) 0px -1px 0px inset",
                  borderRadius: "24px",
                  cursor: "pointer",
                }
                : {
                  background: "transparent",
                  padding: "8px 16px",
                  borderRadius: "0px",
                  cursor: "pointer",
                }
            }
            className=""
            onClick={() => toggleSections("url")}
          >
            Upload by URL
          </button>
        </div>
        <p className="sc-ebf96a8a-1 bYmorg"></p>
        <div>
          <div className="space-y-4" style={{ cursor: "pointer" }}>
            {showFileUpload && (
              <div
                className="h-40 w-full relative text-center file-upload-section"
                style={{ cursor: "pointer" }}
              >
                <input
                  className="cursor-pointer hidden"
                  style={{ cursor: "pointer" }}
                  type="file"
                  id="input-file-upload"
                  required
                //   accept="application/pdf"
                //   onChange={handleFileChange}
                  multiple
                  accept='application/pdf, image/png'
                  onChange={handleFileChange}
                  disabled={fileLimit}
                />
                <label
                  style={{ cursor: "pointer" }}
                  className="h-full flex items-center justify-center border rounded transition-all bg-white border-dashed border-stone-300"
                  for="input-file-upload"
                >
                  <div className="cursor-pointer mx-auto">
                    <FaCloudUploadAlt className="mx-auto fs-2" />
                    <p className="pointer-events-none font-medium text-base leading-6 pointer opacity-75">
                      Click to upload or drag and drop
                    </p>
                    <p className="pointer-events-none font-medium text-sm leading-6 pointer text-gray-600 opacity-75">
                      Supported formats: .pdf', '.txt', '.ppt', '.pptx', '.csv',
                      '.epub', '.rtf'
                    </p>
                  </div>
                </label>
              </div>
            )}
            {name.name}

            {/* <div className="flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>

              <span className="flex-shrink mx-4 uppercase text-gray-600 text-xs">
                or
              </span>

              <div className="flex-grow border-t border-gray-200"></div>
            </div> */}
            {!showFileUpload && (
              <>
                <div className="flex flex-col space-y-2 url-input-section">
                  <label className="pointer-events-none font-medium text-base leading-6 pointer opacity-75">
                    Import from URL
                  </label>
                  <div className="sc-1c859520-0 jHAXMR ">
                    <input
                      className="sc-1c859520-1 cvZGAj grow text-sm"
                      type="url"
                      placeholder="https://cdn.openai.com/papers/gpt-4.pdf"
                      value=""
                      multiple
                      accept='application/pdf, image/png'
                      onChange={handleFileEvent}
                      disabled={fileLimit}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center py-1 space-x-3">
                  <button
                    type="button"
                    disabled={!file} // Disable the button if no file is selected
                    className={`sc-7ff41d46-0 aEnZv ${!file ? "opacity-50" : ""
                      }`}
                    style={{ marginTop: "10px" }}
                    onClick={handleUrl}
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    className="sc-7ff41d46-0 aEnZv !bg-[#f8f5ee] !text-black/75"
                    style={{ border: "1px solid rgb(229, 227, 218)" }}
                    fdprocessedid="9z47ta"
                    onClick={hide}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            <div className="flex">
              <span
                aria-label="This PDF file will not be stored on our servers. 
You will only be able to chat with this document but not view it. 
This document will be removed after 7 days of inactivity."
                data-microtip-position="top"
                role="tooltip"
              ></span>
            </div>
            <div className="flex items-center space-x-3">
              <span
                aria-label="Optical character recognition.
Makes the text of a scanned document searchable."
                data-microtip-position="top"
                role="tooltip"
              >
                <span className="flex items-center">
                  <input
                    id="ocr-doc"
                    type="checkbox"
                    className="cursor-pointer w-4 h-4 accent-orange-600 bg-gray-100 border-gray-300 rounded"
                    checked={isOcrChecked}
                    onChange={(e) => setIsOcrChecked(e.target.checked)}
                  />
                  <label
                    for="ocr-doc"
                    className="cursor-pointer ml-2 text-sm font-medium text-gray-900"
                  >
                    OCR
                  </label>
                </span>
              </span>
            </div>
            <button
              type="button"
              disabled={!file} // Disable the button if no file is selected
              className={`sc-7ff41d46-0 aEnZv ${!file ? "opacity-50" : ""}`}
              style={{ marginTop: "10px" }}
              onClick={handleUrl}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
   

          
        </div>
    )
}

export default Allpdf