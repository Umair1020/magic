import React, { useState } from "react";
import Loader from "./Loader";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from "react-router-dom";
import ControlPanel from "./ControlPanel";
import "./pdf.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = ({ path, file }) => {
  const pathname = useLocation();
  const newName = pathname.pathname;
  const corsProxy = `https://anywhere.synapssolutions.com/${path}`;
  const srcFile = path ? corsProxy : file;
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1); // Ensure this is managed if you have pagination

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  const defaultZoom = window.innerWidth < 768;
  function onDocumentLoadError(error) {
    console.error("Failed to load the document:", error);
    setIsLoading(false); // stop showing the loader
  }

  return (
    <div>
      <section
        id="pdf-section"
        className="pdf-container d-flex flex-column align-items-center w-100"
      >
        <Document
          file={srcFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<Loader isLoading={true} />}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
              renderMode="canvas"
              renderTextLayer={false} // Disable text layer rendering
              inputRef={(ref) => {
                if (ref) {
                  ref.style.height = `100vh`; // Set page height explicitly
                }
              }}
              width={
                newName === "/resumescanner" || newName === "/invoicescanner"
                  ? 500
                  : 700
              }
            />
          ))}
        </Document>
        {!defaultZoom ? (
          <div
            style={{
              position: "fixed",
              bottom: "0",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <ControlPanel
              scale={scale}
              setScale={setScale}
              numPages={numPages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              file={srcFile}
            />
          </div>
        ) : (
          <ControlPanel
            scale={scale}
            setScale={setScale}
            numPages={numPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            file={srcFile}
          />
        )}
      </section>
    </div>
  );
};

export default PDFReader;
