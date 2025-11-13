import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { EllipsisVertical, FileJson, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

export const MenuAdd = () => {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium
                     bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700
                     rounded-lg shadow-sm hover:shadow-md text-gray-700 dark:text-gray-200
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          <span>Ajout rapide</span>
          <EllipsisVertical size={18} />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700 shadow-lg ring-1 ring-black/5 
                     focus:outline-none z-50 overflow-hidden p-1"
        >
          {/* Ajouter un mot */}
          <MenuItem
            as="button"
            onClick={() => navigate("dico/add-choice/single")}
            className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm 
                       text-gray-700 dark:text-gray-200 transition
                       data-active:bg-blue-50 data-active:dark:bg-blue-900/40
                       data-active:text-blue-600 data-active:dark:text-blue-300"
          >
            <PlusCircle size={16} />
            Ajouter un mot
          </MenuItem>

          {/* Importer des mots */}
          <MenuItem
            as="button"
            onClick={() => navigate("dico/add-choice/import")}
            className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm 
                       text-gray-700 dark:text-gray-200 transition
                       data-active:bg-blue-50 data-active:dark:bg-blue-900/40
                       data-active:text-blue-600 data-active:dark:text-blue-300"
          >
            <FileJson size={16} />
            Importer des mots
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
