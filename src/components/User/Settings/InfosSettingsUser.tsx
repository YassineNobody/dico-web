import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useSettingsUser } from "../../../hooks/useSettingsUser";
import { RotateCcw } from "lucide-react";

export const InfosSettingsUser = () => {
  const { settings, setVisibility, resetAll, isMutating } = useSettingsUser();

  const [isPublic, setIsPublic] = useState(settings?.isPublicWords ?? false);

  useEffect(() => {
    if (settings) {
      setIsPublic(settings.isPublicWords);
    }
  }, [settings]);

  const handleTogglePublic = async () => {
    setIsPublic((prev) => !prev);
    await setVisibility();
  };

  const handleResetAll = async () => {
    const confirmReset = confirm(
      "Voulez-vous vraiment réinitialiser tous vos paramètres ?"
    );
    if (!confirmReset) return;
    await resetAll();
  };

  return (
    <div className="w-full mx-auto px-4 flex flex-col gap-4 font-montserrat">
      {/* 🎚️ Dictionnaire public */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                   gap-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                   rounded-xl p-4 shadow-sm"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center sm:text-left">
          Rendre mon dictionnaire public
        </span>

        <div className="flex items-center justify-center sm:justify-end gap-2">
          <Switch
            checked={isPublic}
            onChange={handleTogglePublic}
            disabled={isMutating}
            className={`${
              isPublic
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 dark:bg-gray-700"
            } relative inline-flex h-7 w-12 items-center rounded-full transition-all disabled:opacity-50`}
          >
            <span
              className={`${
                isPublic ? "translate-x-6" : "translate-x-1"
              } inline-block h-5 w-5 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span
            className={`text-xs sm:text-sm font-semibold ${
              isPublic
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {isPublic ? "Public" : "Privé"}
          </span>
        </div>
      </div>
      {/* 🔁 Bouton Reset */}
      <button
        onClick={handleResetAll}
        disabled={isMutating}
        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 
                   text-white text-sm font-medium px-6 py-3 rounded-xl mt-3
                   transition-all shadow-md hover:shadow-lg disabled:opacity-50
                   active:scale-95 w-full sm:w-auto sm:self-center"
      >
        <RotateCcw size={18} />
        Réinitialiser tous les paramètres
      </button>
    </div>
  );
};
