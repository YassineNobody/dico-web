import { Editor, useEditorState } from "@tiptap/react";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";

export const TextFormatButtons = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive("bold"),
      italic: editor?.isActive("italic"),
      underline: editor?.isActive("underline"),
    }),
  });

  const baseBtn = "p-2 rounded transition flex items-center justify-center";
  const activeBtn = "bg-blue-500 text-white shadow-sm";
  const inactiveBtn =
    "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800";

  return (
    <div className="flex items-center gap-1">
      {/* BOLD */}
      <button
        aria-pressed={editorState.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${baseBtn} ${editorState.bold ? activeBtn : inactiveBtn}`}
      >
        <Bold size={18} />
      </button>

      {/* ITALIC */}
      <button
        aria-pressed={editorState.italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${baseBtn} ${editorState.italic ? activeBtn : inactiveBtn}`}
      >
        <Italic size={18} />
      </button>

      {/* UNDERLINE */}
      <button
        aria-pressed={editorState.underline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${baseBtn} ${
          editorState.underline ? activeBtn : inactiveBtn
        }`}
      >
        <UnderlineIcon size={18} />
      </button>
    </div>
  );
};
