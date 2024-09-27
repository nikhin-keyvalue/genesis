/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import "./sample.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

export default function Sample() {
  const [file, setFile] = useState("./sample.pdf");
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState("");

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event) {
    setPopupVisible(false);
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setPopupPosition({
        top: rect.top + window.scrollY - 49,
        left: rect.left + window.scrollX,
      });
      setSelectedText(selectedText);
      setPopupVisible(true);
    } else {
      setPopupVisible(false);
    }
  };

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        <div
          className="Example__container__document"
          ref={setContainerRef}
          onMouseUp={handleTextSelection}
        >
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (_el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))}
          </Document>
        </div>
      </div>

      {popupVisible && (
        <div
          style={{
            position: "absolute",
            top: popupPosition.top,
            left: popupPosition.left,
            padding: "12px 16px",
            color: "#DE5327",
            zIndex: 1000,
            height: '46px',
            background: '#111111',
            borderRadius: '8px',
            fontFamily: 'Clash Display',
            fontSize: '16px',
            lineHeight: '19px',
            fontWeight: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img src="/ai.png" alt="ai" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          <p>Explain with AI</p>
        </div>
      )}
    </div>
  );
}
