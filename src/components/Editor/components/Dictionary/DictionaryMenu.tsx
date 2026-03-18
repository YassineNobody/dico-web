import { useState } from "react";

type Mode = "public" | "private" | "themes";

type Props = {
  onChange: (mode: Mode) => void;
};

export const DictionaryMenu = ({ onChange }: Props) => {
  const [mode, setMode] = useState<Mode>("public");

  const select = (m: Mode) => {
    setMode(m);
    onChange(m);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => select("public")}
        className={`border rounded p-2 text-sm ${
          mode === "public"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        Dico public
      </button>

      <button
        onClick={() => select("private")}
        className={`border rounded p-2 text-sm ${
          mode === "private"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        Mon dico
      </button>

      <button
        onClick={() => select("themes")}
        className={`border rounded p-2 text-sm ${
          mode === "themes"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        Par thème
      </button>
    </div>
  );
};
