import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import { FontSize } from "./extensions/fontSize";
import { FontFamily } from "./extensions/fontFamily";
import Underline from "@tiptap/extension-underline";
import { EditableContent } from "./components/componentsEditor/EditableContent";
import type { FolderMenu } from "../../interfaces/folder/folder";
import { DictionaryExtension } from "./extensions/dictionary/DictionaryExtension";
import { DictionaryPanel } from "./components/Dictionary/DictionaryPanel";

export const EditorTextFolder = ({
  content,
  folder,
  slugText,
}: {
  content: string;
  folder: FolderMenu;
  slugText: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      FontSize,
      FontFamily,
      Color,
      DictionaryExtension,
    ],

    content: content.trim() ? content : "<p>Commence à écrire...</p>",

    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[300px]",
        dir: "auto",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full flex-1 flex flex-col gap-3 relative">
      <EditableContent editor={editor} folder={folder} slugText={slugText} />
      <DictionaryPanel editor={editor} />
    </div>
  );
};
