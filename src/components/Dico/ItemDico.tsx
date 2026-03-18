import { useState, useEffect } from "react";
import { transliterate } from "transliteration";
import type { Word } from "../../interfaces/dico/word";
import {
  BookOpen,
  User,
  CalendarDays,
  Type,
  Palette,
  EllipsisVertical,
  Plus,
  Minus,
  Trash2,
  SquarePen,
} from "lucide-react";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import { ModalUpdateWord } from "../Modal/Form/ModalUpdateWord";
import { ModalDeleteWord } from "../Modal/Form/ModalDeleteWord";
import { Phonetic } from "./Phonetic";

const colorOptions = {
  bleu: "text-blue-700 dark:text-blue-400",
  black: "text-gray-900 dark:text-gray-100",
  green: "text-green-700 dark:text-green-400",
};

interface ItemDicoProps {
  word: Word;
  initialFontSize?: number;
  initialColor?: keyof typeof colorOptions;
  onFontSizeChange?: (size: number) => void;
  onColorChange?: (color: keyof typeof colorOptions) => void;
}

export const ItemDico = ({
  word,
  initialFontSize = 18,
  initialColor = "black",
  onFontSizeChange,
  onColorChange,
}: ItemDicoProps) => {
  const { showModal, hideModal } = useModal();
  const { user } = useAuth();
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [color, setColor] = useState<keyof typeof colorOptions>(initialColor);

  const handleUpdateItem = () => {
    showModal({
      title: "Modifier un mot",
      Component: ModalUpdateWord,
      props: {
        onClose: hideModal,
        word,
      },
    });
  };

  const handleDeleteItem = () => {
    showModal({
      title: "Confirmation de suppression",
      Component: ModalDeleteWord,
      props: { onClose: hideModal, word },
    });
  };
  // 🧩 Synchroniser les props avec le state
  useEffect(() => {
    setFontSize(initialFontSize);
  }, [initialFontSize]);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const sourceL = word.sourceLanguage === "FR" ? "Français" : "Arabe";
  const targetL = word.targetLanguage === "FR" ? "Français" : "Arabe";
  const typeLabel = mapWordType(word.wordType);

  const arabicWord =
    word.sourceLanguage === "AR"
      ? word.sourceWord
      : word.targetLanguage === "AR"
        ? word.translationWord
        : null;

  const phonetic = arabicWord ? transliterate(arabicWord) : null;

  const handleFontSizeChange = (newSize: number) => {
    const clamped = Math.max(14, Math.min(50, newSize));
    setFontSize(clamped);
    onFontSizeChange?.(clamped);
  };

  const handleColorChange = (c: keyof typeof colorOptions) => {
    setColor(c);
    onColorChange?.(c);
  };

  return (
    <div className="lg:max-w-4xl w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-row-reverse shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* ⚙️ Menu simple */}
      <div className="flex h-full relative">
        <Menu>
          <MenuButton className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <EllipsisVertical size={18} />
          </MenuButton>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <MenuItems className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
              {/* 🔠 Taille du texte */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Type size={16} />
                  <span className="text-sm font-medium">Taille du texte</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleFontSizeChange(fontSize - 2)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    type="number"
                    min={14}
                    max={50}
                    value={fontSize}
                    onChange={(e) =>
                      handleFontSizeChange(Number(e.target.value))
                    }
                    className="w-14 text-center border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  />
                  <button
                    onClick={() => handleFontSizeChange(fontSize + 2)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* 🎨 Choix de la couleur */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Palette size={16} />
                  <span className="text-sm font-medium">Couleur du texte</span>
                </div>
                <div className="flex gap-3">
                  {Object.keys(colorOptions).map((c) => (
                    <button
                      key={c}
                      onClick={() =>
                        handleColorChange(c as keyof typeof colorOptions)
                      }
                      className={`h-6 w-6 rounded-full border-2 ${
                        color === c
                          ? "ring-2 ring-offset-1 ring-green-500"
                          : "border-gray-300 dark:border-gray-600"
                      } ${
                        c === "bleu"
                          ? "bg-blue-600"
                          : c === "green"
                            ? "bg-green-600"
                            : "bg-black"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      {/* 🧱 Contenu principal */}
      <div className="w-full p-4 font-sans">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {sourceL}
            </span>
            <span
              className={`font-semibold ${colorOptions[color]}`}
              style={{ fontSize }}
            >
              {word.sourceWord}
            </span>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {targetL}
            </span>
            <span
              className={`font-semibold ${colorOptions[color]}`}
              style={{ fontSize }}
            >
              {word.translationWord}
            </span>
          </div>
        </div>
        {word.normalizedWord && (
          <div className="mt-3 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>
                <span className="font-medium">Arabe sans voyelles :</span>{" "}
                {word.normalizedWord}
              </span>
            </span>

            {phonetic && <Phonetic phonetic={phonetic} />}
          </div>
        )}

        <div className="mt-4 flex flex-row items-center w-full justify-between">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {typeLabel && (
              <span className="px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                {typeLabel}
              </span>
            )}

            {word.author && (
              <span className="flex items-center gap-1">
                <User size={14} />
                <span className="font-montserrat capitalize">
                  {word.author.username || "Utilisateur"}
                </span>
              </span>
            )}
            {user && user.id === word.userId && (
              <span className="flex items-center gap-1">
                <User size={14} className="text-green-800" />
                <span className="font-montserrat capitalize font-bold text-green-800">
                  Moi
                </span>
              </span>
            )}

            {word.createdAt && (
              <span className="flex items-center gap-1">
                <CalendarDays size={14} />
                {new Date(word.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          {user && user.id === word.userId && (
            <div className="flex flex-row gap-4">
              <SquarePen
                size={18}
                className="text-blue-800 cursor-pointer"
                onClick={handleUpdateItem}
              />
              <Trash2
                size={18}
                className="text-red-600 cursor-pointer"
                onClick={handleDeleteItem}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 🔹 Fonction utilitaire
const mapWordType = (type: string): string => {
  switch (type) {
    case "noun":
      return "Nom";
    case "verb":
      return "Verbe";
    case "adjective":
      return "Adjectif";
    case "adverb":
      return "Adverbe";
    case "preposition":
      return "Préposition";
    case "pronoun":
      return "Pronom";
    case "suffix":
      return "Suffixe";
    default:
      return "Autre";
  }
};
