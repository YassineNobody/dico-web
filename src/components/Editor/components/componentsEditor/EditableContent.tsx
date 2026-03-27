import { useState, useEffect, useRef } from "react";
import { EditorContent, Editor } from "@tiptap/react";
import { Toolbar } from "./ToolbarEditor";
import { Eye, Pencil, Save } from "lucide-react";
import debounce from "lodash.debounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FolderMenu } from "../../../../interfaces/folder/folder";
import { updateTextFolder } from "../../../../services/textFolder";

type Props = {
  editor: Editor | null;
  folder: FolderMenu;
  slugText: string;
};

export const EditableContent = ({ editor, folder, slugText }: Props) => {
  const [isEditing, setIsEditing] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const queryClient = useQueryClient();

  if (!editor) return null;

  /*
  =========================
  MUTATION
  =========================
  */

  const mutation = useMutation({
    mutationFn: (content: string) =>
      updateTextFolder(folder.id, slugText, {
        content,
        slug: slugText,
      }),

    onSuccess: (data) => {
      setLastSaved(data.content);
      setLastSavedAt(new Date());
      setHasChanges(false);

      queryClient.setQueryData(["text", folder.id, slugText], data);
    },
  });

  /*
  =========================
  SAVE DOCUMENT
  =========================
  */

  const saveDocument = async (html: string) => {
    if (saving) return;

    setSaving(true);

    try {
      await mutation.mutateAsync(html);
    } finally {
      setSaving(false);
    }
  };

  /*
  =========================
  SAVE MANUEL
  =========================
  */

  const handleSave = async () => {
    const html = editor.getHTML();

    if (html === lastSaved) return;

    await saveDocument(html);
  };

  /*
  =========================
  AUTOSAVE DEBOUNCE
  =========================
  */

  const debouncedSaveRef = useRef(
    debounce((html: string) => {
      saveDocument(html);
    }, 1500),
  );

  /*
  =========================
  LISTEN EDITOR UPDATE
  =========================
  */

  useEffect(() => {
    const updateHandler = () => {
      const html = editor.getHTML();

      if (html !== lastSaved) {
        setHasChanges(true);
        debouncedSaveRef.current(html);
      }
    };

    editor.on("update", updateHandler);

    return () => {
      editor.off("update", updateHandler);
    };
  }, [editor, lastSaved]);

  /*
  =========================
  CLEANUP DEBOUNCE
  =========================
  */

  useEffect(() => {
    return () => {
      debouncedSaveRef.current.cancel();
    };
  }, []);

  /*
  =========================
  SAVE WHEN EXIT EDIT MODE
  =========================
  */

  const toggleMode = async () => {
    if (isEditing) {
      const html = editor.getHTML();

      if (html !== lastSaved) {
        await saveDocument(html);
      }
    }

    setIsEditing((prev) => !prev);
  };

  /*
  =========================
  BEFORE UNLOAD
  =========================
  */

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const html = editor.getHTML();

      if (html !== lastSaved) {
        debouncedSaveRef.current.flush();
        saveDocument(html);

        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editor, lastSaved]);

  /*
  =========================
  FORMAT TIME AGO
  =========================
  */

  const getTimeAgo = () => {
    if (!lastSavedAt) return "";

    const diff = Math.floor((Date.now() - lastSavedAt.getTime()) / 1000);

    if (diff < 5) return "à l'instant";
    if (diff < 60) return `il y a ${diff}s`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `il y a ${minutes} min`;

    const hours = Math.floor(minutes / 60);
    return `il y a ${hours}h`;
  };

  /*
  =========================
  STATUS TEXT
  =========================
  */

  const getStatus = () => {
    if (saving) return "Sauvegarde...";
    if (hasChanges) return "Non sauvegardé";
    if (lastSavedAt) return `Sauvegardé ${getTimeAgo()}`;
    return "Enregistré";
  };

  /*
  =========================
  UI
  =========================
  */

  return (
    <div className="space-y-3">
      {/* ACTIONS */}
      <div className="flex gap-2 items-center">
        <button
          onClick={toggleMode}
          className="border px-2 py-1 rounded text-xs flex items-center gap-1"
        >
          {isEditing ? (
            <>
              <Eye size={14} />
              Mode affichage
            </>
          ) : (
            <>
              <Pencil size={14} />
              Mode écriture
            </>
          )}
        </button>

        <button
          onClick={handleSave}
          className="border px-2 py-1 rounded text-xs flex items-center gap-1"
        >
          <Save size={14} />
          Sauvegarder
        </button>

        <span className="text-xs text-gray-500">{getStatus()}</span>
      </div>

      {isEditing ? (
        <>
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
        </>
      ) : (
        <div
          className="prose max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
        />
      )}
    </div>
  );
};
