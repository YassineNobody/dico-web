import type { User } from "../../../interfaces/user/user";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown, User2, Mail, CalendarDays } from "lucide-react";

interface InfosUserProps {
  user: User;
}

export const InfosUser = ({ user }: InfosUserProps) => {
  return (
    <div className="w-full max-w-md mx-auto font-montserrat">
      <Disclosure>
        {({ open }) => (
          <div
            className={`rounded-xl overflow-hidden border transition-all duration-200 
                        ${
                          open
                            ? "border-blue-500 dark:border-blue-400 shadow-md"
                            : "border-gray-200 dark:border-gray-700 shadow-sm"
                        }`}
          >
            {/* Header */}
            <DisclosureButton
              className="flex items-center justify-between w-full px-5 py-3 bg-gray-50 
                         dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 
                         text-left text-sm font-semibold text-gray-800 dark:text-gray-200 
                         transition-all"
            >
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="flex items-center gap-3">
                  <User2 size={20} className="text-blue-500" />
                  <span>Informations utilisateur</span>
                </div>
                <div className="px-4 flex items-center capitalize">
                  <span>{user.username}</span>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  open ? "rotate-180 text-blue-500" : ""
                }`}
              />
            </DisclosureButton>

            {/* Contenu */}
            <DisclosurePanel className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-950">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="font-medium">{user.email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User2 size={16} className="text-gray-400" />
                  <span className="font-medium">{user.username}</span>
                </div>

                {user.createdAt && (
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-gray-400" />
                    <span>
                      Inscrit le{" "}
                      {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>
    </div>
  );
};
