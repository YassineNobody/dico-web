import { Editor } from "@tiptap/react";

export const ColorPicker = ({ editor }: { editor: Editor }) => {
  return (
    <input
      type="color"
      onChange={(event) =>
        editor.chain().focus().setColor(event.target.value).run()
      }
      className="w-8 h-8 border rounded cursor-pointer"
    />
  );
};
