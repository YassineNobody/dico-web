import { useState, useEffect, useMemo } from "react";
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

      queryClient.setQueryData(["text", folder.id, slugText], data);
    },
  });

  /*
  =========================
  SAVE DOCUMENT
  =========================
  */

  const saveDocument = async (html: string) => {
    setSaving(true);

    await mutation.mutateAsync(html);

    setSaving(false);
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

  const debouncedSave = useMemo(
    () =>
      debounce((html: string) => {
        if (html !== lastSaved) {
          saveDocument(html);
        }
      }, 1500),
    [lastSaved],
  );

  /*
  =========================
  LISTEN EDITOR UPDATE
  =========================
  */

  useEffect(() => {
    const updateHandler = () => {
      const html = editor.getHTML();
      debouncedSave(html);
    };

    editor.on("update", updateHandler);

    return () => {
      editor.off("update", updateHandler);
    };
  }, [editor, debouncedSave]);

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
  SAVE BEFORE PAGE LEAVE
  =========================
  */

  useEffect(() => {
    const handleBeforeUnload = () => {
      const html = editor.getHTML();

      if (html !== lastSaved) {
        saveDocument(html);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editor, lastSaved]);

  /*
  =========================
  UI
  =========================
  */

  return (
    <div className="space-y-3">
      {/* ACTIONS */}
      <div className="flex gap-2 items-center">
        {/* MODE EDIT / VIEW */}
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

        {/* SAVE */}
        <button
          onClick={handleSave}
          className="border px-2 py-1 rounded text-xs flex items-center gap-1"
        >
          <Save size={14} />
          Sauvegarder
        </button>

        {/* STATUS */}
        <span className="text-xs text-gray-500">
          {saving ? "Sauvegarde..." : "Enregistré"}
        </span>
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
