/* eslint-disable no-unused-vars */
import { useCallback, useState, useEffect } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import "./sample.css";


import acids from './pdfs/chem/acids.pdf'
import alcohols from './pdfs/chem/alcohols.pdf'
import hydrocarbons from './pdfs/chem/hydrocarbons.pdf'
import reaction_mechanism from './pdfs/chem/reaction_mechanism.pdf'

import gravitation from './pdfs/phy/gravitation.pdf'
import thermodynamics from './pdfs/phy/thermodynamics.pdf'
import units_and_measurements from './pdfs/phy/units_and_measurements.pdf'
import waves from './pdfs/phy/waves.pdf'
import Chat from "../../components/chat";
import Loader from "../../components/loader";

const fileConfig = {
  phy: [
    {
      key: 'gravitation',
      file: gravitation,
      name: 'Gravitation',
    },
    {
      key: 'thermodynamics',
      file: thermodynamics,
    },
    {
      key: 'units_and_measurements',
      file: units_and_measurements,
    },
    {
      key: 'waves',
      file: waves,
    },
  ],
  chem: [
    {
      key: 'acids',
      file: acids,
      name: 'Acids',
    },
    {
      key: 'alcohols',
      file: alcohols,
      name: 'Alcohols',
    },
    {
      key: 'hydrocarbons',
      file: hydrocarbons,
      name: 'Hydrocarbons',
    },
    {
      key: 'reaction_mechanism',
      file: reaction_mechanism,
      name: 'Reaction Mechanism',
    },
  ],
}

const topic = "chem";


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
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(false)
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
    setPopupVisible(false);
    setOpenChat(false)
  }

  const handleTakeTest = () => {
    Navigate('/generate-test')
    setPopupVisible(false);

  }

  const handleExplain = () => {
      setOpenChat(true)
      setPopupVisible(false);
  }

  const onLoadProgress = () => {
    setIsLoading(true)
  }

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="pdf-header">
          <div className="breadcrumbs-container">
            <div className="h-line" />
            {pdfs.map((pdf, index) => (
              <button
                key={pdf.key}
                className={`breadcrumbs-btn ${file.key === pdf.key ? 'active' : ''}`}
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
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
          className="Example__container__document"
          ref={setContainerRef}
          onMouseUp={handleTextSelection}
        >
          <Document
            file={file.file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadProgress={onLoadProgress}
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
            cursor: 'pointer',
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

      <div
        style={{zIndex: 10}}
        className={`w-[500px] transition-all duration-500 ease-in-out  shadow-lg fixed top-0 ${openChat ? "right-0" : "right-[-500px]"
          } `}
      >
        <Chat
        isUserExplainFlow={true}
        context={{
          sub_topic: file.key,
          selected_text: selectedText
        }} />
      </div>
    </div>
  );
}
