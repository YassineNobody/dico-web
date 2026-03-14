import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

type Props = {
  phonetic: string;
};

export const Phonetic = ({ phonetic }: Props) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center gap-2">
      <span className="italic text-gray-500">{phonetic}</span>

      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-center h-4 w-4 cursor-pointer rounded-full border text-xs text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Info size={14} />
      </button>

      {open && (
        <div className="absolute top-6 right-0 w-60 p-2 text-xs rounded-md border shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 z-50">
          ⚠️ La translittération est générée automatiquement. Elle peut contenir
          des approximations et ne remplace pas une vraie transcription
          phonétique.
        </div>
      )}
    </div>
  );
};
