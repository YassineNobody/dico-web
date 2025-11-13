import { useEffect, useRef, useState, type FC } from "react";
import { Document as PdfDocument, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import { useGesture } from "@use-gesture/react";
import { motion, useMotionValue } from "framer-motion";
import { Loader2, FileWarning, Plus, Minus } from "lucide-react";
import type { Learn as Document } from "../../interfaces/learn/learn";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const ViewerPdfDocument: FC<{ data: Document }> = ({ data }) => {
  const { urlPdf } = data;

  const [numPages, setNumPages] = useState<number | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [pdfWidth, setPdfWidth] = useState(800);

  // 🔹 Zoom + Pan values
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 🔹 Ajustement de la largeur
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPdfWidth(Math.min(width, 800));
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 🔹 Gestures : zoom + drag
  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        if (scale.get() > 1) {
          x.set(dx);
          y.set(dy);
        }
      },
      onPinch: ({ offset: [d] }) => {
        const newScale = 1 + d / 200;
        const limited = Math.min(Math.max(newScale, 1), 3);
        scale.set(limited);
        if (limited === 1) {
          x.set(0);
          y.set(0);
        }
      },
      onWheel: ({ event }) => {
        if (event.ctrlKey) {
          event.preventDefault();
          const delta = (event as WheelEvent).deltaY;
          const newScale = scale.get() - delta * 0.001;
          const limited = Math.min(Math.max(newScale, 1), 3);
          scale.set(limited);
          if (limited === 1) {
            x.set(0);
            y.set(0);
          }
        }
      },
    },
    {
      target: containerRef,
      eventOptions: { passive: false },
      drag: { from: () => [x.get(), y.get()] },
      pinch: { from: () => [(scale.get() - 1) * 200, 0] },
    }
  );

  // 🔘 Fonctions manuelles de zoom
  const handleZoomIn = () => {
    const newScale = Math.min(scale.get() + 0.2, 3);
    scale.set(newScale);
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale.get() - 0.2, 1);
    scale.set(newScale);
    if (newScale === 1) {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white shadow-md rounded-xl p-3 w-full max-w-5xl mx-auto overflow-hidden"
      >
        {/* 🟢 Boutons de zoom */}
        <div className="absolute top-3 right-3 flex flex-row gap-2 z-10">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 shadow-md transition"
            title="Zoomer"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 shadow-md transition"
            title="Dézoomer"
          >
            <Minus size={18} />
          </button>
        </div>

        <PdfDocument
          file={urlPdf}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            setIsPdfLoading(false);
            setLoadError(null);
          }}
          onLoadError={(error) => {
            console.error("Erreur PDF:", error);
            setLoadError("Impossible de charger le PDF.");
            setIsPdfLoading(false);
          }}
          loading={
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-green-600 w-8 h-8" />
            </div>
          }
        >
          {/* Loader */}
          {isPdfLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-green-600 w-8 h-8" />
            </div>
          )}

          {/* Erreur */}
          {loadError && (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <FileWarning className="w-10 h-10 text-red-500 mb-2" />
              <p className="text-sm font-semibold">{loadError}</p>
            </div>
          )}

          {/* ✅ PDF avec zoom + drag */}
          {!isPdfLoading && !loadError && numPages && (
            <motion.div
              style={{
                scale,
                x,
                y,
                cursor: scale.get() > 1 ? "grab" : "default",
                touchAction: "none",
              }}
              className="flex flex-col gap-4 items-center"
            >
              {Array.from({ length: numPages }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex justify-center"
                >
                  <Page
                    pageNumber={i + 1}
                    width={pdfWidth - 20}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </PdfDocument>
      </motion.div>
    </div>
  );
};
