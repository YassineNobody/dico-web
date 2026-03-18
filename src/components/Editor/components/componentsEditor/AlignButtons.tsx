import { Editor } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useEditorState } from "@tiptap/react";

export const AlignButtons = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      left: editor?.isActive({ textAlign: "left" }),
      center: editor?.isActive({ textAlign: "center" }),
      right: editor?.isActive({ textAlign: "right" }),
    }),
  });

  const baseBtn = "p-2 rounded transition flex items-center justify-center";
  const activeBtn = "bg-blue-500 text-white shadow-sm";
  const inactiveBtn =
    "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800";

  return (
    <div className="flex items-center gap-1">
      <button
        aria-pressed={editorState.left}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`${baseBtn} ${editorState.left ? activeBtn : inactiveBtn}`}
      >
        <AlignLeft size={18} />
      </button>

      <button
        aria-pressed={editorState.center}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`${baseBtn} ${editorState.center ? activeBtn : inactiveBtn}`}
      >
        <AlignCenter size={18} />
      </button>

      <button
        aria-pressed={editorState.right}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`${baseBtn} ${editorState.right ? activeBtn : inactiveBtn}`}
      >
        <AlignRight size={18} />
      </button>
    </div>
  );
};
