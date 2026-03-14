import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { ArrowLeft, Folder, FileText, Menu as MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FolderMenu } from "../../../interfaces/folder/folder";

type Props = {
  folder: FolderMenu;
  folderSlug: string;
  currentTextSlug: string;
};

export const MenuTextEditFolder = ({
  folder,
  folderSlug,
  currentTextSlug,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="flex items-center gap-2 px-3 py-1.5 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
        <MenuIcon size={16} />
        Documents
      </MenuButton>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <MenuItems
          className="absolute left-0 mt-2 w-60 z-50
  bg-white dark:bg-neutral-900
  border border-gray-200 dark:border-neutral-700
  rounded-lg shadow-xl
  focus:outline-none"
        >
          {/* Retour aux dossiers */}
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => navigate("/folders")}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm ${
                  active ? "bg-gray-100 dark:bg-neutral-800" : ""
                }`}
              >
                <ArrowLeft size={14} />
                Tous les dossiers
              </button>
            )}
          </MenuItem>
          {/* Dossier actuel */}
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => navigate(`/folders/${folderSlug}`)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm ${
                  active ? "bg-gray-100 dark:bg-neutral-800" : ""
                }`}
              >
                <Folder size={14} />
                {folder.name}
              </button>
            )}
          </MenuItem>
          <div className="border-t my-1" />
          {/* Liste des textes */}
          {folder.texts.map((text) => (
            <MenuItem key={text.slug}>
              {({ active }) => (
                <button
                  onClick={() =>
                    navigate(`/folders/${folderSlug}/${text.slug}`)
                  }
                  className={`flex w-full items-center gap-2 px-3 py-2 text-sm ${
                    text.slug === currentTextSlug
                      ? "font-semibold text-blue-600"
                      : ""
                  } ${active ? "bg-gray-100 dark:bg-neutral-800" : ""}`}
                >
                  <FileText size={14} />
                  {text.title}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
};
