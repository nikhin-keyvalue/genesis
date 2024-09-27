/* eslint-disable no-unused-vars */
import { useCallback, useState, useEffect } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import "./sample.css";


import acids from './pdfs/chem/acids.pdf'
import alcohols from './pdfs/chem/acids.pdf'
import hydrocarbons from './pdfs/chem/acids.pdf'
import reaction_mechanism from './pdfs/chem/acids.pdf'

import gravitation from './pdfs/phy/gravitation.pdf'
import thermodynamics from './pdfs/phy/thermodynamics.pdf'
import units_and_measurements from './pdfs/phy/units_and_measurements.pdf'
import waves from './pdfs/phy/waves.pdf'

const fileConfig = {
  phy: [
    {
      name: 'gravitation',
      file: gravitation,
    },
    {
      name: 'thermodynamics',
      file: thermodynamics,
    },
    {
      name: 'units_and_measurements',
      file: units_and_measurements,
    },
    {
      name: 'waves',
      file: waves,
    },
  ],
  chem: [
    {
      name: 'acids',
      file: acids,
    },
    {
      name: 'alcohols',
      file: alcohols,
    },
    {
      name: 'hydrocarbons',
      file: hydrocarbons,
    },
    {
      name: 'reaction_mechanism',
      file: reaction_mechanism,
    },
  ],
}

const topic = "phy";


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
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState('');
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [openChat, setOpenChat] = useState(false);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    if (fileConfig[topic]) {
      setPdfs(fileConfig[topic]);
      setFile(fileConfig[topic][0]);
    }
  }, [fileConfig])


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

  const handleBreadcrumbClick = (pdf) => {
    setFile(pdf)
  }

  const handleTakeTest = () => {

  }

  const handleExplain = () => {
    setOpenChat(true)
  }

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="pdf-header">
          <div className="breadcrumbs-container">
            <div className="h-line" />
            {pdfs.map((pdf, index) => (
              <button
                key={pdf.name}
                className={`breadcrumbs-btn ${file.name === pdf.name ? 'active' : ''}`}
                onClick={() => handleBreadcrumbClick(pdf)}
              >
                {pdf.name}
              </button>
            ))}
          </div>
          <button className="take-test" onClick={handleTakeTest}>
            Take Test
            <img src="/send.png" alt="send" />
          </button>
        </div>
        <div
          className="Example__container__document"
          ref={setContainerRef}
          onMouseUp={handleTextSelection}
        >
          <Document
            file={file.file}
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
          onClick={handleExplain}
        >
          <img src="/ai.png" alt="ai" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          <p>Explain with AI</p>
        </div>
      )}
    </div>
  );
}
